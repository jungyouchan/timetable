import './login.css';
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
                document.querySelector('.bigArea').style.height = '80vh';
                const confirmPassword = document.createElement('div');
                confirmPassword.className = 'inputValue';
                const input = document.createElement('input');
                input.id = 'confirmPassword';
                input.required = true;
                input.setAttribute('oninvalid', "this.setCustomValidity('비밀번호를 확인해 주세요')");
                input.setAttribute('oninput', "this.setCustomValidity('')");
                input.setAttribute('autocomplete', 'off');
                const label = document.createElement('label');
                label.textContent = 'ConfirmPassword';
                const span = document.createElement('span');
                confirmPassword.append(input, label, span);
                form.insertBefore(confirmPassword, document.querySelector('.loginButton'));
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

function submit(type) {
    switch (type.type) {
        case 'login':
            console.log('로그인 제출');
            break;
        case 'signup':
            console.log('회원가입 제출');
            break;
    }
}

function initFormHandlers() {
    const form = document.querySelector('form');
    // 처음에는 type으로 선택
    let mainButton = document.querySelector('button[type="submit"]');
    let subButton = document.querySelector('button[type="button"]');

    if (!mainButton || !subButton || !form) return;

    // 버튼에 고유 data-role 속성 추가
    mainButton.dataset.role = 'main';
    subButton.dataset.role = 'sub';

    // 초기 order 설정
    mainButton.style.order = '1';
    subButton.style.order = '2';

    mainButton.dataset.action = mainButton.dataset.action || 'submit-login';
    subButton.dataset.action = subButton.dataset.action || 'toggle-signup';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        const action = submitBtn.dataset.action;
        if (action === 'submit-login') submit({ type: 'login' });
        else if (action === 'submit-signup') submit({ type: 'signup' });
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.dataset.action;
        if (!action) return;
        
        e.preventDefault(); // 폼 제출 방지
        
        if (action === 'toggle-signup') {
            changeForm({ type: 'login' });
        } else if (action === 'toggle-login') {
            changeForm({ type: 'signup' });
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandlers);
} else {
    initFormHandlers();
}