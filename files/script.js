// Lightweight interactions: nav toggle, smooth scroll, contact form -> mailto fallback
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav toggle for small screens
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? '' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '8px';
    });
  }

  // smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      if(!targetId) return;
      const el = document.getElementById(targetId);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // contact form: open mailto with prefilled content as fallback
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name') || 'No name';
    const email = formData.get('email') || 'no-email';
    const message = formData.get('message') || '';
    // Try to open default email client
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    status.textContent = "Opening your email client... If nothing happens, please email you@example.com directly.";
    setTimeout(()=> status.textContent = '', 6000);
    form.reset();
  });

  // download CV buttons (replace the href with your actual CV path)
  function triggerCvDownload(){
    // replace with your CV filename or URL
    const cvUrl = 'Vks_resume (1).pdf';
    // try to navigate to the PDF (works on same-origin / uploaded file)
    window.open(cvUrl, '_blank');
  }
  document.getElementById('downloadCv')?.addEventListener('click', (e)=>{ e.preventDefault(); triggerCvDownload(); });
  document.getElementById('downloadCv2')?.addEventListener('click', (e)=>{ e.preventDefault(); triggerCvDownload(); });
});