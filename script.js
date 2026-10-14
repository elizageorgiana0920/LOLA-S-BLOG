class UserSession {
    constructor() {
        this.storageKey = 'lola_user_data';
    }

    saveUser(username) {
        const userData = {
            name: username,
            loginDate: new Date().toLocaleDateString() 
        };
        localStorage.setItem(this.storageKey, JSON.stringify(userData));
    }

    getUser() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    logout() {
        localStorage.removeItem(this.storageKey);
        location.reload();
    }
}

const session = new UserSession();

document.addEventListener('DOMContentLoaded', function() {
    
    const svgPisica = document.getElementById("svg-pisica");

    if (svgPisica) {
        svgPisica.addEventListener("click", function() {
            alert("Ai făcut clic pe pisica!");
        });
    }

    document.addEventListener("click", function(event) {
        if (event.target.tagName === "P") {
            event.target.style.color = "red";
        }
    });

    const selectPlaneta = document.getElementById('select-planeta');
    const pozaPlaneta = document.getElementById('poza-planeta');3000

    if (selectPlaneta && pozaPlaneta) {
        selectPlaneta.addEventListener('change', function(e) {
            const valoare = e.target.value; 

            if (valoare === "marte") {
                pozaPlaneta.src = "poza17.jpg";
            } else if (valoare === "venus") {
                pozaPlaneta.src = "poza18.jpg";
            } else if (valoare === "jupiter") {
                pozaPlaneta.src = "poza19.jpg";
            } 
        });
    }

    const loggedUser = session.getUser();
    const actionBtn = document.querySelector('.action_btn');

    if (loggedUser && actionBtn) {
        actionBtn.textContent = "SALUT, " + loggedUser.name.toUpperCase() + "! (LOGOUT)";
        actionBtn.href = "#";  //sa para ca e accesat ceva
        actionBtn.style.backgroundColor = "#28a745"; 
        actionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            session.logout();
        });
    }

    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        setInterval(function() {
            const colors = ['#FEE715', '#FF7F50', '#00FFFF', '#FFFFFF', '#FF00FF'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            mainTitle.style.color = randomColor;
        }, 3000);
    }

    const regForm = document.getElementById('formular-inregistrare');
    if (regForm) {
        regForm.addEventListener('submit', function (event) {
            let isValid = true;
            
            const username = document.getElementById('reg-username');
            const email = document.getElementById('reg-email');
            const pass = document.getElementById('reg-password');
            const confirm = document.getElementById('reg-confirm-password');

            document.querySelectorAll('.error-msg').forEach(function(msg) {
                msg.style.display = 'none';
            });
            
            [username, email, pass, confirm].forEach(function(inp) {
                inp.classList.remove('input-error');
            });

            // Validare Email cu RegEx
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                isValid = false;
                email.classList.add('input-error');
                document.getElementById('err-email').style.display = 'block';
            }

            // Validare Parole
            if (pass.value.length < 6) {
                isValid = false;
                pass.classList.add('input-error');
                document.getElementById('err-password').style.display = 'block';
            }
            if (pass.value !== confirm.value) {
                isValid = false;
                confirm.classList.add('input-error');
                document.getElementById('err-confirm-password').style.display = 'block';
            }

            if (!isValid) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                session.saveUser(username.value);
                const successInfo = document.getElementById('success-info');
                if (successInfo) {
                    successInfo.textContent = "Acces permis în Galaxie! Te redirecționăm...";
                    successInfo.style.display = 'block';
                }
                setTimeout(function() { 
                    window.location.href = 'index.html'; 
                }, 2000);
            }
        });
    }

    // COMENTARII 
    const btnAjax = document.getElementById('btn-incarca-comentarii');
    const containerAjax = document.getElementById('comentarii-container');
    const btnAdauga = document.getElementById('btn-adauga-mesaj');

    function creeazaCard(nume, mesaj, esteLocal = false) {
        const div = document.createElement('div');
        div.className = 'ajax-post';
        if (esteLocal) div.style.borderLeft = "5px solid #00ff00";
        div.innerHTML = "<strong>🚀 " + nume + "</strong><p>" + mesaj + "</p>";
        return div;
    }

    if (btnAjax && containerAjax) {
        btnAjax.addEventListener('click', function(e) {
            fetch('comentarii.json')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    data.forEach(function(item) {
                        containerAjax.appendChild(creeazaCard(item.nume, item.mesaj));
                    });
                    btnAjax.remove();
                })
        });
    }

   if (btnAdauga) {
    btnAdauga.addEventListener('click', function() {
        var inputNume = document.getElementById('mesaj-nume'); 
        var inputText = document.getElementById('mesaj-text'); 

        if (inputNume.value.trim() && inputText.value.trim()) {
          
            var cardNou = creeazaCard(inputNume.value, inputText.value, true); 
            containerAjax.insertBefore(cardNou, containerAjax.firstChild);

            var comentariiLocal = JSON.parse(localStorage.getItem('comentarii')) || [];
            
            comentariiLocal.unshift({ 
                nume: inputNume.value, 
                mesaj: inputText.value 
            });
            
            localStorage.setItem('comentarii', JSON.stringify(comentariiLocal));

            inputNume.value = "";
            inputText.value = "";
        }
    });

    // salvare date si dupa refresh
    var comentariiSalvate = JSON.parse(localStorage.getItem('comentarii')) || []; //initializare array gol
    
    comentariiSalvate.forEach(function(c) {
        containerAjax.appendChild(creeazaCard(c.nume, c.mesaj, true));
    });
}

    const contactForm = document.getElementById('formular-urare');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const mesajInp = document.getElementById('mesaj-urare');
            const mesajText = mesajInp.value;

            if (mesajText.trim().length < 10) {
                e.preventDefault();
                mesajInp.classList.add('input-error');
                alert("Mesajul tău este prea scurt! Scrie măcar 10 caractere.");
            } else {
                e.preventDefault();
                alert("Urarea a fost transmisă către Lola prin satelit! 🐾");
                contactForm.reset();
                mesajInp.classList.remove('input-error');
            }
        });
    }

    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key.toLowerCase() === 'c') {
            alert("Eroare galactică: nu este voie să copiezi blogul Lolei, se va supăra!");
        }
        if (event.key.toLowerCase() === "q") {
            const mainTitle = document.querySelector('h1');
            if (mainTitle) {
                const stil = window.getComputedStyle(mainTitle);
                const culoareActuala = stil.color;
                alert("Info Sistem: Culoarea actuală a titlului este " + culoareActuala + ".");
            }
        }
    });

    // JOCUL CANVAS
    const canvas = document.getElementById('catCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let scor = 0;
        let bobite = [];

        function creeazaBobita() {
            return {
                x: Math.random() * (canvas.width - 20) + 10, //evit margini
                y: -10,
                v: Math.random() * 2 + 1,
                r: 10
            };
        }

        function animaJoc() {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (Math.random() < 0.05) bobite.push(creeazaBobita());

            bobite.forEach(function(b, index) {
                b.y += b.v;
                ctx.fillStyle = "#FEE715";
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();

                if (b.y > canvas.height + 20) bobite.splice(index, 1);
            });

            ctx.fillStyle = "white";
            ctx.font = "bold 18px Roboto";
            ctx.fillText("Scor: " + scor, 15, 30);

            requestAnimationFrame(animaJoc);
        }

        canvas.addEventListener('mousedown', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            bobite.forEach(function(b, index) {
                const dist = Math.sqrt(Math.pow(mx - b.x, 2) + Math.pow(my - b.y, 2));
                if (dist < b.r + 10) {
                    bobite.splice(index, 1);
                    scor++;
                    const scorVal = document.getElementById('scor-valoare');
                    if (scorVal) scorVal.innerText = scor;
                }
            });
        });

        animaJoc();
    }
});
