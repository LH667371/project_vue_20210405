<template>
    <div id="wrap">
        <div id="top_content">
            <div id="header">
                <div id="rightheader">
                    <p>
                        {{ date }} {{ time }}
                        <br/>
                    </p>
                </div>
                <div id="topheader">
                    <h1 id="title">
                        <a href="#">Main</a>
                    </h1>
                </div>
                <div id="navigation">
                </div>
            </div>
            <div id="content">
                <p id="whereami">
                </p>
                <h1>
                    注册
                </h1>
                <table cellpadding="0" cellspacing="0" border="0"
                       class="form_table" align="center">
                    <tr>
                        <td valign="middle" align="right">
                            邮箱:
                        </td>
                        <td valign="middle" align="left">
                            <input type="text" class="inputgri" v-model="email"
                                   @keyup="check_email"/>
                            <span style="color: red" v-show="msg1">{{ email_msg }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" align="right">
                            手机号:
                        </td>
                        <td valign="middle" align="left">
                            <input type="text" class="inputgri" v-model="phone" @keyup="check_phone"/>
                            <span style="color: red" v-show="msg2">{{ phone_msg }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" align="right">
                            密码:
                        </td>
                        <td valign="middle" align="left">
                            <input type="password" class="inputgri" v-model="password" @keyup="msg3 = password === ''"/>
                            <span style="color: red" v-show="msg3">*必填</span>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" align="right">
                            再次输入密码:
                        </td>
                        <td valign="middle" align="left">
                            <input type="password" class="inputgri" v-model="re_password"
                                   @blur="check_password"/>
                            <span style="color: red" v-show="msg4">{{ password_msg }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" align="right">
                            姓名:
                        </td>
                        <td valign="middle" align="left">
                            <input type="text" class="inputgri" v-model="name" @keyup="msg5 = name === ''"/>
                            <span style="color: red" v-show="msg5">*必填</span>
                        </td>
                    </tr>
                    <tr>
                        <td valign="middle" align="right">
                            性别:
                        </td>
                        <td valign="middle" align="left">
                            男
                            <input type="radio" class="inputgri" name="sex" @click="gender=0;msg6 = gender === ''">
                            女
                            <input type="radio" class="inputgri" name="sex" @click="gender=1;msg6 = gender === ''">
                            <span style="color: red" v-show="msg6">*必填</span>
                        </td>
                    </tr>
                </table>
                <p align="center">
                    <el-button size="small" @click="register" round>提 交</el-button>
                    <!--                    <input type="submit" class="button" value="提交" @click="register"/>-->
                    &nbsp;&nbsp
                    <router-link to="/">登录</router-link>
                </p>
            </div>
        </div>
        <div id="footer">
            <div id="footer_bg">
                ABC@126.com
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString('chinese', {hour12: false}),
            email: '',
            email_msg: '*必填',
            phone: '',
            phone_msg: '*必填',
            password: '',
            re_password: '',
            password_msg: '*必填',
            name: '',
            gender: '',
            msg1: false,
            msg2: false,
            msg3: false,
            msg4: false,
            msg5: false,
            msg6: false,
        }
    },
    methods: {
        register() {
            this.msg1 = this.email === '';
            this.msg2 = this.phone === '';
            this.msg3 = this.password === '';
            this.msg4 = this.re_password === '';
            this.msg5 = this.name === '';
            this.msg6 = this.gender === '';
            if (!this.msg1 && !this.msg2 && !this.msg3 && !this.msg4 && !this.msg5 && !this.msg6)
                this.$axios({
                    url: 'http://127.0.0.1:8000/user/',
                    method: 'post',
                    data: {
                        email: this.email,
                        phone: this.phone,
                        password: this.password,
                        name: this.name,
                        gender: this.gender
                    }
                }).then(res => {
                    // console.log(res);
                    if (res.data['status'] === 200) {
                        this.$message({
                            showClose: true,
                            message: '注册成功!',
                            type: 'success'
                        });
                        this.$router.push('/')
                    }
                }).catch(error => {
                    // console.log(error);
                    this.$message({
                        showClose: true,
                        message: error.data['message'],
                        type: 'error'
                    });
                })
        },
        check_email() {
            let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if (email.test(this.email))
                this.email_msg = '';
            else {
                this.msg1 = true;
                this.email_msg = '邮箱格式不正确！';
            }
            if (this.email === '') {
                this.msg1 = true;
                this.email_msg = '*必填';
            }
        },
        check_phone() {
            let phone = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,6,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
            if (phone.test(this.phone)) {
                this.phone_msg = ''
            } else {
                this.msg2 = true;
                this.phone_msg = '手机号格式不正确！';
            }
            if (this.phone === '') {
                this.msg2 = true;
                this.phone_msg = '*必填';
            }
        },
        check_password() {
            if (this.password !== this.re_password) {
                this.msg4 = true;
                this.password_msg = '您输入的两次密码有误!'
            } else
                this.msg4 = false;
            if (this.re_password === '') {
                this.msg4 = true;
                this.email_msg = '*必填';
            }
        },
    },
    mounted() {
        this.timer = setInterval(() => {
            this.date = new Date().toLocaleDateString(); // 修改数据date
            this.time = new Date().toLocaleTimeString('chinese', {hour12: false});
        }, 1000)
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
}
</script>

<style scoped>

</style>
