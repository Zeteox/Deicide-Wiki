document.addEventListener('mousemove', function (e) {
    const cursor = document.getElementById('custom-cursor');
    cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && (el.tagName === 'INPUT' || el.tagName === 'BUTTON' || el.tagName === 'A')) {
        cursor.style.opacity = '0';
    } else if (el && el.tagName === 'DIV' || el.tagName === 'LABEL' || el.tagName === 'FORM' || el.tagName === 'IMG' || el.tagName === 'H1' || el.tagName === 'P') {
        cursor.style.opacity = '0.5';
    } else {
        cursor.style.opacity = '1';
    }
});

document.getElementById('switch-to-login').addEventListener('click', function (e) {
    e.preventDefault();
    if (document.getElementById('signup-form').style.display !== 'none') {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    } else {
        document.getElementById('signup-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';

    }
});