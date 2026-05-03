document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. ANIMASI SCROLL FADE-UP */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

    /* 2. CUSTOM TRAILING CURSOR WEB3 */
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");
    const glow = document.querySelector(".cursor-glow");

    // Posisi target (mouse sebenarnya)
    let mouseX = 0, mouseY = 0;
    // Posisi outline (bergerak lebih lambat untuk efek trailing)
    let outlineX = 0, outlineY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Titik tengah langsung mengikuti kursor
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
        
        // Cahaya Glow besar juga langsung mengikuti kursor
        glow.style.left = `${mouseX}px`;
        glow.style.top = `${mouseY}px`;
    });

    // Fungsi loop untuk pergerakan halus (Lerp) pada garis outline
    function animateOutline() {
        // Kecepatan mengikuti (0.15 = 15% dari jarak tersisa setiap frame)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    /* 3. MAGNETIC BUTTONS (Efek Tertarik Magnet) */
    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Titik tengah elemen
            const h = rect.width / 2;
            const v = rect.height / 2;
            
            // Posisi mouse relatif terhadap elemen
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            // Tarik elemen (kekuatan magnet: 0.3)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            
            // Besarkan kursor outline saat menyentuh elemen magnet
            outline.classList.add('hover-active');
        });

        // Kembalikan ke posisi awal saat mouse pergi
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            outline.classList.remove('hover-active');
        });
    });

    /* 4. TYPEWRITER EFFECT PADA HERO TITLE */
    const typeText = document.querySelector(".typing-text");
    const words = ["Digital Experiences.", "Creative UI/UX.", "Web3 Interfaces.", "Modern Web Apps."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--; // Hapus karakter
        } else {
            charIndex++; // Ketik karakter
        }

        // Update teks di HTML
        typeText.textContent = currentWord.substring(0, charIndex);

        // Atur kecepatan ketik (lebih cepat saat menghapus)
        let typeSpeed = isDeleting ? 50 : 100;

        // Logika perpindahan kata
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Jeda 2 detik setelah selesai ngetik 1 kata
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Lanjut ke kata berikutnya
            typeSpeed = 500; // Jeda sebelum ngetik kata baru
        }

        setTimeout(typeWriter, typeSpeed);
    }
    
    // Mulai animasi ngetik
    if(typeText) setTimeout(typeWriter, 1000);

/* 5. EFEK 3D TILT & CARD SPOTLIGHT KARTU BENTO */
    document.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Logika 3D Tilt
            const centerX = rect.width / 2; 
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Logika Senter di Dalam Kartu (Card Spotlight)
            const glow = card.querySelector('.card-glow');
            if(glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset posisi saat ditinggalkan
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});