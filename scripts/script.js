const body = document.querySelector('body');

// Fungsi untuk membuat elemen daun yang bergerak
function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.style.left = `${Math.random() * 100}vw`;
  leaf.style.animationDuration = `${Math.random() * 5 + 5}s`;
  body.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, 10000);
}

// Interval untuk membuat daun baru
setInterval(createLeaf, 1000);

  
const targetDate = new Date("February 2, 2025 00:00:00").getTime();


const countdownInterval = setInterval(() => {
  const now = new Date().getTime(); 
  const timeRemaining = targetDate - now; 

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown-timer").innerHTML = `
      <p class="ongoing-event">Acara Sedang Berlangsung</p>
    `;
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

 
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
}, 1000);

//RSVP
function openRSVPForm() {
    console.log("RSVP form opened");
    const modal = document.getElementById("rsvp-modal");
    modal.classList.remove("hidden");
  }
  
  document.getElementById("open-rsvp-btn").addEventListener("click", () => {
    console.log("RSVP button clicked");
    openRSVPForm();
  });
  
function closeRSVPForm() {
    const modal = document.getElementById("rsvp-modal");
    modal.classList.add("hidden");
  }
 
//Set Reminder  
document.getElementById('set-reminder').addEventListener('click', () => {
    const eventDetails = {
      title: 'Wedding Event',
      location: 'Your Wedding Location',
      description: 'Don’t miss the special day!',
      startDate: new Date(2025, 1, 5, 10, 0), 
      endDate: new Date(2025, 1, 5, 13, 0),  
    };
  
    const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${formatDateForCalendar(eventDetails.startDate)}/${formatDateForCalendar(eventDetails.endDate)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
    
    window.open(calendarLink, '_blank');
  });
  
  function formatDateForCalendar(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  }
//Aktifkan Notif  
  document.getElementById('turn-on-notification').addEventListener('click', () => {
    if (Notification.permission === 'granted') {
      scheduleNotification();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          scheduleNotification();
        }
      });
    }
  });
  
  function scheduleNotification() {
    const eventTime = new Date(2025, 2, 2, 10, 0).getTime(); 
    const currentTime = Date.now();
    const delay = eventTime - currentTime;
  
    if (delay > 0) {
      setTimeout(() => {
        new Notification('Acara Dimulai!', {
          body: 'Acara pernikahan telah dimulai. Jangan sampai ketinggalan!',
          icon: 'icon-url-here.png',
        });
      }, delay);
    } else {
      alert('Waktu acara sudah lewat.');
    }
  };
  
//Kirim ke WA
document.getElementById("sendToWhatsApp").addEventListener("click", function () {
  const nama = document.getElementById("nama").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const response = document.querySelector('input[name="response"]:checked')?.value;

  if (!nama || !whatsapp || !response) {
      alert("Mohon lengkapi semua data!");
      return;
  }

    const message = `Halo, saya ${nama}.
    dari ${alamat || "-"} ${response}`;


  const encodedMessage = encodeURIComponent(message);

  // ganti "62xxxxxxxxxx" 
  const whatsappURL = `https://wa.me/6289516125743?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
});

//lokasi

document.getElementById("lihat-lokasi").addEventListener("click", function () {
    const mapsURL = "https://www.google.com/maps/place/Kedungoleng,+Kec.+Paguyangan,+Kabupaten+Brebes,+Jawa+Tengah/@-7.3200299,108.8598224,12z/data=!3m1!4b1!4m10!1m2!2m1!1sDesa+Kedungoleng+RT+4+RW+9,+Kecamatan+Paguyangan,+Kabupaten+Brebes+,+Jawa+Tengah,+Indonesia!3m6!1s0x2e6f88866f457861:0x74d52fa7c49c9778!8m2!3d-7.3198127!4d108.9918254!15sCltEZXNhIEtlZHVuZ29sZW5nIFJUIDQgUlcgOSwgS2VjYW1hdGFuIFBhZ3V5YW5nYW4sIEthYnVwYXRlbiBCcmViZXMgLCBKYXdhIFRlbmdhaCwgSW5kb25lc2lhkgEUYWRtaW5pc3RyYXRpdmVfYXJlYTTgAQA!16s%2Fg%2F121rvp5s?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D";
    window.open(mapsURL, "_blank");
  });
  
  document.querySelectorAll('.toggle-menu a').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); 
  
    
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
  
   
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'      
        });
      }
    });
  });

//Gift
document.getElementById('open-wedding-gift').addEventListener('click', function() {
  var weddingGift = document.getElementById('wedding-gift'); 
  
  if (weddingGift.style.display === 'none' || weddingGift.style.display === '') 
  { weddingGift.style.display = 'block'; } else { weddingGift.style.display = 'none'; } });
  
  function closeGiftForm() {
    const giftForm = document.getElementById("wedding-gift");
    giftForm.style.display = "none";
  }

//Wish  
// Mengirimkan wish
function sendWish() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const wish = document.getElementById("wish").value.trim();

  if (!name || !address || !wish) {
    alert("Semua field harus diisi!");
    return;
  }

  const data = { name, address, wish };

  fetch("https://undangan-muamar-ira.vercel.app/wishes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Wish berhasil ditambahkan!");
      fetchWishes(); // Refresh daftar wishes
    })
    .catch((error) => {
      console.error("Gagal mengirim data:", error);
    });
}

// Mengambil wishes
function fetchWishes() {
  fetch("https://undangan-muamar-ira.vercel.app/wishes")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const output = document.getElementById("wishes-output");
      if (output) {
        output.innerHTML = data
          .map(
            (wish) => `
          <div class="wish-item">
            <strong>${wish.name}</strong> dari ${wish.address} berkata: "${wish.wish}"
          </div>
        `
          )
          .join("");
      }
    })
    .catch((error) => {
      console.error("Gagal mengambil data:", error);
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchWishes);


//Music  
const musicToggle = document.getElementById("music-toggle");
const music = document.getElementById("background-music");

if (musicToggle && music) {
    // Autoplay musik setelah 1 detik
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            music.play()
                .then(() => {
                    console.log("Musik diputar otomatis setelah 1 detik.");
                    musicToggle.innerText = "🎵"; 
                    musicToggle.style.backgroundColor = "#4caf50"; 
                })
                .catch((error) => {
                    console.warn(
                        "Autoplay dicegah oleh browser. Klik tombol untuk memulai musik.",
                        error
                    );
                    musicToggle.innerText = "🎵";
                });
        }, 1000); 
    });

    // Event listener untuk tombol toggle musik
    musicToggle.addEventListener("click", () => {
        if (music.paused) {
            music.play()
                .then(() => {
                    console.log("Musik diputar melalui tombol.");
                    musicToggle.innerText = "🎵"; 
                    musicToggle.style.backgroundColor = "#4caf50"; 
                })
                .catch((error) => {
                    console.error("Gagal memutar musik:", error);
                });
        } else {
            music.pause();
            console.log("Musik dijeda.");
            musicToggle.innerText = "🎵"; 
            musicToggle.style.backgroundColor = "#4caf50"; 
        }
    });
}






