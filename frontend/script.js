
/* Per-user complaints + admin pending queue (keeps data separate per login) */

const $ = id => document.getElementById(id);
const adminKey = 'admin:pending';
const userKey = u => `complaints:${u}`;
const getUser = u => JSON.parse(localStorage.getItem(userKey(u)) || '[]');
const setUser = (u, arr) => localStorage.setItem(userKey(u), JSON.stringify(arr));
const getAdmin = () => JSON.parse(localStorage.getItem(adminKey) || '[]');
const setAdmin = a => localStorage.setItem(adminKey, JSON.stringify(a));

const auth = {
  u: () => sessionStorage.getItem('loggedIn') === 'true',
  a: () => sessionStorage.getItem('isAdmin') === 'true',
  user: () => sessionStorage.getItem('email') || null
};

function login() {
  const e = $('email')?.value?.trim();
  const p = $('password')?.value;
  if (!e || !p) { alert('Please enter email and password'); return; }
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('email', e);
  alert('Login successful');
  location.href = 'dashboard.html';
}

function showToast(msg, type='info'){ const id='toast-'+Date.now(); const el=document.createElement('div'); el.id=id; el.className='toast '+type; el.innerText=msg; Object.assign(el.style,{position:'fixed',right:'20px',bottom:'20px',padding:'10px 14px',background:type==='error'?'#ef4444':'#10b981',color:'#fff',borderRadius:'8px',boxShadow:'0 6px 18px rgba(16,24,40,0.12)',zIndex:9999}); document.body.appendChild(el); setTimeout(()=>{el.style.transition='opacity .4s ease'; el.style.opacity='0'; setTimeout(()=>el.remove(),400)},2500); }

// ONLY THIS FUNCTION HAS THE DATABASE SYNC ADDED
async function submitComplaint() {
  if (!auth.u()) {
    showToast('Please login first', 'error');
    location.href = 'index.html';
    return;
  }

  const user = auth.user();
  const title = $('title')?.value?.trim();
  const description = $('description')?.value?.trim();

  if (!title || !description) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // --- DATABASE SYNC START ---
  try {
    const res = await fetch('http://localhost:5000/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user,          // user email / username
        title: title,        // complaint title
        message: description, // complaint description
        status: 0            // pending
      })
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Backend error:', err);
      showToast('Failed to save to database', 'error');
    } else {
      const data = await res.json();
      console.log('✅ Complaint saved to DB:', data);
      showToast('Complaint saved to database');
    }
  } catch (err) {
    console.warn('MongoDB offline, saved locally only', err);
    showToast('Database offline, saved locally only', 'error');
  }
  // --- DATABASE SYNC END ---

  // --- LOCAL STORAGE ---
  const uArr = getUser(user);
  uArr.push({ id, title, description, status: 'Pending' });
  setUser(user, uArr);

  const aArr = getAdmin();
  aArr.push({ id, owner: user, title, description, status: 'Pending' });
  setAdmin(aArr);

  // Clear form
  if ($('title')) $('title').value = '';
  if ($('description')) $('description').value = '';

  const out = $('submit-result');
  if (out) out.innerHTML = `Your complaint ID: <b>${id}</b>`;
  else alert('Your complaint ID: ' + id);

  showToast('Complaint submitted locally');
  renderComplaints();
}
function checkStatus() {
  const id = $('check-id')?.value?.trim();
  const out = $('status-result');
  const user = auth.user();
  if (!id) { if (out) out.innerText = 'Please enter a complaint ID.'; return; }
  const c = getUser(user).find(x => x.id === id);
  if (!c) { if (out) out.innerHTML = `<span style="color:#b91c1c">No complaint with ID ${id}</span>`; return; }
  if (out) out.innerHTML = `
    <div><b>ID:</b> ${c.id}</div>
    <div><b>Title:</b> ${c.t}</div>
    <div><b>Status:</b> ${c.status}</div>
    <div>${c.d}</div>
  `;
}

function renderComplaints({ admin = false } = {}) {
  const div = admin ? $('admin-complaints') : $('complaints');
  if (!div) return;

  const arr = admin ? getAdmin() : getUser(auth.user());
  if (!arr.length) { div.innerHTML = '<div class="complaint">No complaints</div>'; return; }

  div.innerHTML = arr
    .map((c, i) => `
      <div class="complaint">
        <b>${c.t}</b>
        <div>${c.d}</div>
        <div>${admin ? `<em>from: ${c.owner}</em><br>` : ''}Status: <b>${c.status}</b></div>
        ${admin ? `<div style="margin-top:8px;"><button onclick="resolve('${c.id}')">Resolve</button></div>` : ''}
      </div>
    `)
    .join('');
}

function resolve(id) {
  if (!auth.a()) { alert('Only admin'); return; }

  // remove from admin queue
  const a = getAdmin();
  const idx = a.findIndex(x => x.id === id);
  if (idx < 0) { alert('Complaint not found'); return; }
  const item = a[idx];
  a.splice(idx, 1);
  setAdmin(a);

  // mark resolved in owner's storage
  const owner = item.owner;
  const u = getUser(owner);
  const ui = u.findIndex(x => x.id === id);
  if (ui >= 0) { u[ui].status = 'Resolved'; setUser(owner, u); }

  showToast(`Resolved complaint ${id}`);
  renderComplaints({ admin: true });
}

function adminToggle(enter) {
  if (enter) {
    const p = $('admin-password') ? $('admin-password').value : '';
    if (p === 'admin123') {
      sessionStorage.setItem('isAdmin', 'true');
      $('admin-login-card') && ($('admin-login-card').style.display = 'none');
      $('admin-complaints') && ($('admin-complaints').style.display = 'block');
      $('admin-controls') && ($('admin-controls').style.display = 'block');
      renderComplaints({ admin: true });
      showToast('Admin signed in');
    } else alert('Invalid password');
  } else {
    sessionStorage.removeItem('isAdmin');
    location.href = 'index.html';
  }
}

function refreshStatus() {
  const el = $('admin-status');
  if (!el) return; el.innerText = `Pending: ${getAdmin().length}`;
}

function logout() { sessionStorage.removeItem('loggedIn'); sessionStorage.removeItem('email'); location.href = 'index.html'; }

document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname;

  if (path.endsWith('dashboard.html')) {
    if (!auth.u()) return (location.href = 'index.html');
    const user = auth.user();
    const el = $('user-email'); if (el) el.innerText = `Logged in as: ${user}`;
    renderComplaints();
  }

  if (path.endsWith('admin.html')) {
    if (auth.a()) { $('admin-login-card') && ($('admin-login-card').style.display = 'none'); $('admin-complaints') && ($('admin-complaints').style.display = 'block'); renderComplaints({ admin: true }); } else { $('admin-login-card') && ($('admin-login-card').style.display = 'block'); $('admin-complaints') && ($('admin-complaints').style.display = 'none'); }
  }
});