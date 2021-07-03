if ('alt' in window) {
    alt.on('showPage', step => auth.showPage(step));
    alt.on('showAuth', (toggle, name) => auth.fOnLoad(toggle, name));
    alt.on('setLang', lang => {
        console.log(`auth.lang: ${lang}`)
        auth.lang = lang;
    })
} else 
{
    setTimeout(() => 
    {
        auth.fOnLoad(true)
        auth.page = 2
        container.classList.add('right-panel-active');
        // auth.showPage(3)
    }, 10);
}

let auth = new Vue({
    el: '#auth',
    data: { 
        page: 0,
        agree: 0,
        autoLogin: 0,
        enteredLoginMail: '',
        enteredLoginPass: '',
        enteredMail: '',
        enteredPass1: '',
        enteredPass2: '',
        enteredName: '',
        // enteredSurname: '',
        enteredFloor: '',
        passChecked: false,
        // character: [0, 0, -1],
        methodSpawn: [1, 0, 0],
        // activeCharacter: 0,
        tab: '0',
        lang: 'ru',

    },
    methods: {
        fOnLoad: function(toggle, name = '') {
            this.enteredName = name; 
            setTimeout(() => {
                const container = document.getElementById('fade');
                if (toggle) {
                    let i = 0.0;
                    let intervalID = setInterval(() => {
                        i += 0.01;
                        container.style.opacity = i;
                        if (i > 0.9) {
                            container.style.opacity = 1.0;
                            clearInterval(intervalID);
                        }
                    }, 10);
                } else {
                    let i = 1.0;
                    let intervalID = setInterval(() => {
                        i -= 0.01;
                        container.style.opacity = i;
                        // console.log(i)
                        if (i < 0.1) {
                            container.style.opacity = 0.0;
                            clearInterval(intervalID);
                        }
                    }, 10);
                }
            }, 500);
        },
        showPage: function(step, downloadableSpawn = []) {
            if (step == 0) container.classList.remove('right-panel-active');
            if (step == -1) {
                this.tab = 1;
                let i = 0;
                while (i++ < 3) this.methodSpawn[i] = downloadableSpawn[i];
            } else this.page = step;
        }, 
        sumbitData: function(step) {
            if ('alt' in window) {
                if (step < 0) {
                    const index = step * -1 - 1;
                    if (this.methodSpawn[index] === 1) {
                        // const Fadecontainer = document.getElementById('fade');
                        // Fadecontainer.style.opacity = 0;
                        alt.emit('emitToServer', 'choiceSpawn', step);
                    }
                } else if (step == 0) {
                    // alt.emit('emitToServer', 'loginInUser', {
                    //     email: auth.enteredLoginMail,
                    //     password: auth.enteredLoginPass,
                    // }, false);
                    alt.emit('emitToClient', 'clientLoginInUser', {
                        email: auth.enteredLoginMail,
                        password: auth.enteredLoginPass,
                    }, auth.autoLogin, auth.lang)
                } else if (step == 1) {
                    alt.emit(
                        'emitToServer',
                        'CreateAccountStepForgot',
                        auth.enteredLoginMail
                    );
                } else if (step == 2) {
                    alt.emit('emitToServer', 'CreateAccountStepOne', {
                        email: auth.enteredMail,
                        password: auth.enteredPass1,
                        secondpassword: auth.enteredPass2,
                        name: auth.enteredName,
                        // surname: auth.enteredSurname
                    });
                }
            }
        },
        verifyPass: function() {
            if (this.enteredPass1 === this.enteredPass2 && this.enteredPass1)
                this.passChecked = true;
            else this.passChecked = false;
        },
        fGoAuth: function() {
            setTimeout(() => (this.page = 0), 100);
        }
        // selectCharacter: function (value) {
        //     this.activeCharacter = value;
        //     this.page = 3;
        // },
    },
    computed: {
        isEmailValid() {
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return re.test(this.enteredMail);
            // return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.enteredMail);
        },
        verifyForgotStep() {
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return re.test(this.enteredLoginMail);
            // return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.enteredMail);
        },
        isPassword1Valid() {
            return !/[^A-Z-a-z-0-9]/g.test(this.enteredPass1);
        },
        isPassword2Valid() {
            return !/[^A-Z-a-z-0-9]/g.test(this.enteredPass2);
        },
        verifyStep() {
            if (this.passChecked && this.isEmailValid && this.enteredMail && this.enteredPass1.length > 3) return true;
            else return false;
        },
        verifyAuth() {
            if (this.enteredLoginMail && this.enteredLoginPass) return true;
            else return false;
        },
        isNameValid() {
            return !/[^A-Z-a-z]/g.test(this.enteredName);
        },
        // isSurnameValid() {
        //     return !/[^A-Z-a-z]/g.test(this.enteredSurname);
        // },
        verifySecondStep() {
            if (
                this.enteredName &&
                this.isNameValid &&
                // this.enteredSurname && this.isSurnameValid &&
                this.agree && this.enteredName.length > 3 
            )
                return true;
            //&& this.enteredFloor
            else return false;
        }
    }
});

const signUpButton = document.getElementById('register');
const signInButton = document.getElementById('login');
const forgotPass = document.getElementById('forgotpass');
const container = document.getElementById('auth1');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

forgotPass.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

if ('alt' in window) alt.emit('authLoaded');
