import './styles/login.css';
console.log("Login page loaded");

function changeForm(type) {
    const form = document.querySelector('form');
    const mainButton = document.querySelector('button[data-role="main"]');
    const subButton = document.querySelector('button[data-role="sub"]');

    document.querySelectorAll('input').forEach(e => { e.value = ''; })

    switch (type.type) {
        case 'login':
            { //loginText translate to signUpText
                const loginText = document.querySelector('.loginText');
                const signUpText = document.querySelector('.signUpText');
                loginText.classList.add('animation');
                signUpText.classList.remove('animation');
            }

            { //confirmPassword 추가하기
                document.querySelector('.bigArea').style.height = '100vh';
                const confirmPassword = document.createElement('div');
                confirmPassword.className = 'inputValue';

                //input 생성
                const input = document.createElement('input');
                input.id = 'confirmPassword';
                input.type = 'password';
                input.placeholder = ' ';
                input.name = 'confirmPassword';
                input.required = true;
                input.setAttribute('oninvalid', "this.setCustomValidity('비밀번호를 확인해 주세요')");
                input.setAttribute('oninput', "this.setCustomValidity('')");
                input.setAttribute('autocomplete', 'off');

                //label, span 생성
                const label = document.createElement('label');
                label.textContent = 'ConfirmPassword';

                const span = document.createElement('span');


                //eyebutton 생성
                const eyeButton = document.createElement('button');
                eyeButton.type = 'button';
                eyeButton.className = 'eyeButton';

                const eyeIcon = document.createElement('img');
                eyeIcon.className = 'eyeIcon';
                eyeIcon.src = './src/img/closedeye.png';
                eyeButton.appendChild(eyeIcon);


                confirmPassword.append(input, label, span, eyeButton);

                const selectRole = document.createElement('div');
                selectRole.className = 'inputValue';
                const roleSwitch = createRoleSwitch();
                selectRole.append(roleSwitch);


                form.insertBefore(confirmPassword, document.querySelector('.loginButton'));
                form.insertBefore(selectRole, document.querySelector('.loginButton'));

                requestAnimationFrame(() => {
                    feather.replace();
                });
            }

            { //confirmPassword animation
                setTimeout(() => {
                    document.querySelector('#confirmPassword').classList.add('animation')
                }, 1)
            }

            // FLIP 애니메이션: 버튼 위치 교환
            flipButtonSwap(mainButton, subButton, () => {
                // mainButton: 위(order=1) → 아래(order=2)
                mainButton.style.order = '2';
                mainButton.textContent = '로그인하러 가기';
                mainButton.dataset.action = 'toggle-login';
                mainButton.type = 'button';

                // subButton: 아래(order=2) → 위(order=1)
                subButton.style.order = '1';
                subButton.textContent = '회원가입';
                subButton.dataset.action = 'submit-signup';
                subButton.type = 'submit';
            });

            break;

        case 'signup':
            { // signUpText translate to loginText
                const loginText = document.querySelector('.loginText');
                const signUpText = document.querySelector('.signUpText');
                signUpText.classList.add('animation');
                loginText.classList.remove('animation');
            }

            { //confirmPassword 제거하기
                document.querySelector('#confirmPassword').classList.remove('animation');
                document.querySelector('.bigArea').style.height = '70vh';
                setTimeout(() => {
                    document.querySelector('.inputValue:has(#confirmPassword)').remove();
                }, 1);
            }

            {
                //roleSwitch 제거하기
                document.querySelector('#roleSwitch').classList.remove('animation');
                setTimeout(() => {
                    document.querySelector('.inputValue:has(#roleSwitch)').remove();
                }, 1);
            }

            // FLIP 애니메이션: 버튼 위치 교환
            flipButtonSwap(mainButton, subButton, () => {
                // mainButton: 아래(order=2) → 위(order=1)
                mainButton.style.order = '1';
                mainButton.textContent = '로그인';
                mainButton.dataset.action = 'submit-login';
                mainButton.type = 'submit';

                // subButton: 위(order=1) → 아래(order=2)
                subButton.style.order = '2';
                subButton.textContent = '회원가입하러 가기';
                subButton.dataset.action = 'toggle-signup';
                subButton.type = 'button';
            });

            break;
    }
}


function createRoleSwitch() {
    let state = 0; // 0: students, 1: teachers

    /* ===============================
       feather SVG 생성 (정답 방식)
    =============================== */
    function createFeatherSVG(name) {
        const wrapper = document.createElement('span');
        wrapper.innerHTML = feather.icons[name].toSvg({
            width: 20,
            height: 20,
            stroke: "#fff",
            'stroke-width': 2.5
        });
        return wrapper.firstElementChild;
    }

    /* ===============================
       concept-wrap
    =============================== */
    const wrap = document.createElement('div');
    wrap.className = 'concept-wrap';
    wrap.id = 'roleSwitch';

    /* ===============================
       tap + wave
    =============================== */
    const tap = document.createElement('div');
    tap.className = 'tap';

    const wave = document.createElement('div');
    wave.className = 'wave';

    tap.appendChild(wave);

    /* ===============================
       btn-wrap
    =============================== */
    const btnWrap = document.createElement('div');
    btnWrap.className = 'btn-wrap';

    /* ===============================
       btn-cnt
    =============================== */
    const content = document.createElement('div');
    content.className = 'btn-cnt';

    /* ===============================
       Students
    =============================== */
    const students = document.createElement('div');
    students.className = 'cnt cnt-students';

    const sText = document.createElement('p');
    sText.className = 'text';
    sText.textContent = 'Students';

    const sIcon = createFeatherSVG('chevron-right');

    students.append(sText, sIcon);

    /* ===============================
       Teachers
    =============================== */
    const teachers = document.createElement('div');
    teachers.className = 'cnt cnt-teachers';

    const tText = document.createElement('p');
    tText.className = 'text';
    tText.textContent = 'Teachers';

    const tIcon = createFeatherSVG('chevron-right');

    teachers.append(tText, tIcon);

    /* ===============================
       조립
    =============================== */
    content.append(students, teachers);
    btnWrap.appendChild(content);
    wrap.append(tap, btnWrap);

    /* ===============================
       인터랙션
    =============================== */
    wrap.addEventListener('pointerdown', () => {
        state = (state + 1) % 2;

        // wave
        wave.classList.add('wave-act');
        setTimeout(() => wave.classList.remove('wave-act'), 600);

        // 살짝 튀는 효과
        btnWrap.style.transition = 'transform 0.15s ease';
        btnWrap.style.transform = 'translateX(10px)';
        setTimeout(() => {
            btnWrap.style.transform = 'translateX(0)';
        }, 150);

        // 슬라이드 (텍스트 + 아이콘 함께)
        content.style.transition =
            'transform 0.45s cubic-bezier(.69,-0.49,0,1)';
        content.style.transform =
            state === 1 ? 'translateX(-200px)' : 'translateX(0)';

        document.body.dataset.role =
            state === 1 ? 'teacher' : 'student';
    });

    /* ===============================
       초기 상태
    =============================== */
    document.body.dataset.role = 'student';

    return wrap;
}




function flipButtonSwap(mainButton, subButton, onChange) {
    // FLIP: First - 현재 위치 저장
    const mainRect = mainButton.getBoundingClientRect();
    const subRect = subButton.getBoundingClientRect();

    // Last - order와 텍스트 변경
    onChange();

    // Invert - 새로운 위치에서 원래 위치로 되돌림 (애니메이션 없이)
    const mainRectNew = mainButton.getBoundingClientRect();
    const subRectNew = subButton.getBoundingClientRect();

    const mainDelta = mainRect.top - mainRectNew.top;
    const subDelta = subRect.top - subRectNew.top;

    mainButton.style.transform = `translateY(${mainDelta}px)`;
    subButton.style.transform = `translateY(${subDelta}px)`;
    mainButton.style.transition = 'none';
    subButton.style.transition = 'none';

    // Play - 다음 프레임에 원래 위치로 애니메이션
    requestAnimationFrame(() => {
        mainButton.style.transition = 'transform 0.5s ease';
        subButton.style.transition = 'transform 0.5s ease';
        mainButton.style.transform = '';
        subButton.style.transform = '';
    });
}

function initFormHandlers() {
    const form = document.querySelector('form');
    // 처음에는 type으로 선택
    let mainButton = document.querySelector('button[type="submit"].formButton');
    let subButton = document.querySelector('button[type="button"].formButton');

    if (!mainButton || !subButton || !form) return;

    // 버튼에 고유 data-role 속성 추가
    mainButton.dataset.role = 'main';
    subButton.dataset.role = 'sub';

    // 초기 order 설정
    mainButton.style.order = '1';
    subButton.style.order = '2';

    mainButton.dataset.action = mainButton.dataset.action || 'submit-login';
    subButton.dataset.action = subButton.dataset.action || 'toggle-signup';

    // submit 처리
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) { return };
        const action = submitBtn.dataset.action;
        if (action === 'submit-login') {
            submit({ type: 'login' });
        } else if (action === 'submit-signup') {
            submit({ type: 'signup' });
        }
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.dataset.action;
        if (!action) return;


        if (action === 'toggle-signup') {
            e.preventDefault(); // 폼 제출 방지
            changeForm({ type: 'login' });
        } else if (action === 'toggle-login') {
            e.preventDefault(); // 폼 제출 방지
            changeForm({ type: 'signup' });
        }
    });
}

function hidePassword(btn) {
    const wrapper = btn.closest(".inputValue");
    if (!wrapper) return;

    const input = wrapper.querySelector("input");
    const icon = btn.querySelector("img");

    input.type = "password";
    icon.src = "./src/img/closedeye.png";
}

{
    document.addEventListener("pointerdown", e => {
        const btn = e.target.closest(".eyeButton");
        if (!btn) return;

        e.preventDefault();
        const wrapper = btn.closest(".inputValue");
        const input = wrapper.querySelector("input");
        const icon = btn.querySelector("img");

        input.type = "text";
        icon.src = "./src/img/openeye.png";

        input.blur();
    });

    document.addEventListener("pointerup", e => {
        const btn = e.target.closest(".eyeButton");
        if (!btn) return;
        hidePassword(btn);
    });

    document.addEventListener("pointercancel", e => {
        const btn = e.target.closest(".eyeButton");
        if (!btn) return;
        hidePassword(btn);
    });
}




async function submit(type) {
    if (document.querySelector('input[name="password"]').value !== document.querySelector('input[name="confirmPassword"]')?.value && type.type === 'signup') {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData)
    data.role = document.body.dataset.role;

    try {
        const endPoint = type.type === 'login' ? '/api/login' : '/api/signup';
        const response = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();

        if (result.success) {
            if (type.type === 'login' && result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
            }

            if (type.type === 'login') {
                window.location.href = '/';
            } else {
                window.location.href = '/login';
            }
        } else {
            alert(result.message || '오류가 발생했습니다. 다시 시도해 주세요.');
        }

    } catch (error) {
        console.error('Error during form submission:', error);
    } finally {
        submitBtn.disabled = false;
    }
}









if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandlers);
} else {
    initFormHandlers();
}