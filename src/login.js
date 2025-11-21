function changeForm(type) {

    const form = document.querySelector('form');
    const mainButton = document.querySelector('button[type="submit"]');
    const subButton = document.querySelector('button[type="button"]');

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
        
            {//confirmPassword animation

                setTimeout(() => {
                    document.querySelector('#confirmPassword').classList.add('animation')
                }, 1)
                
            }
            //change button
            setTimeout(() => {
                changeButton(form, mainButton, subButton);
            }, 500);
            {
                
            }
        
            setTimeout(() => {
                form.insertBefore(subButton, mainButton);
                subButton.textContent = '회원가입';
                subButton.setAttribute('onclick', "");
                subButton.setAttribute('type', 'submit');
                subButton.setAttribute('onsubmit', 'submit({"type": "signup"})');
                
                mainButton.textContent = '로그인하러 가기';
                mainButton.setAttribute('onclick', "changeForm({'type': 'signup'})");
                mainButton.setAttribute('type', 'button');
            }, 550)

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
                //change button
                setTimeout(() => {
                    changeButton(form, mainButton, subButton);
                }, 500);
            }

            setTimeout(() => {
                form.insertBefore(subButton, mainButton);
                subButton.textContent = '로그인';
                subButton.setAttribute('onclick', "");
                subButton.setAttribute('type', 'submit');
                subButton.setAttribute('onsubmit', 'submit({"type": "login"})');
            
                mainButton.textContent = '회원가입하러 가기';
                mainButton.setAttribute('onclick', "changeForm({'type': 'login'})");
                mainButton.setAttribute('type', 'button');
            }, 550)
            break;
    }
}


function changeButton(parents, mainButton, subButton) {
    document.querySelectorAll('.formButton').forEach(element => {
        element.classList.add('animation');
    });
    setTimeout(() => {
        parents.insertBefore(subButton, mainButton);

        document.querySelectorAll('.formButton').forEach(element => {
            element.classList.remove('animation');
        });
    }, 250);

}

function submit(type) {
    switch (type.type) {
        case 'login':
            
            break;
        case 'signup':
            
            break;
    }
}