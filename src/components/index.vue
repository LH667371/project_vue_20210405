<template>
    <div id="wrap">
        <div id="top_content">
            <div id="header">
                <div id="rightheader">
                    <p>
                        2021/04/02
                        <br/>
                        <a href="javascript:void(0)" @click="logout">安全退出</a>
                    </p>
                </div>
                <div id="topheader">
                    <h1 id="title">
                        <a href="#">main</a>
                    </h1>
                </div>
                <div id="navigation">
                </div>
            </div>
            <div id="content">
                <p id="whereami">
                </p>
                <h1>
                    {{ name }}，欢迎您的访问！
                </h1>
                <table class="table">
                    <tr class="table_header">
                        <td>
                            ID
                        </td>
                        <td>
                            Name
                        </td>
                        <td>
                            Photo
                        </td>
                        <td>
                            Salary
                        </td>
                        <td>
                            Age
                        </td>
                        <td>
                            Gender
                        </td>
                        <td>
                            Birthday
                        </td>
                        <td>
                            Department
                        </td>
                        <td>
                            Operation
                        </td>
                    </tr>
                    <tr v-for="(value, index) in emp_list" :key="index" :class="{row1:index%2===0, row2:index%2!==0}">
                        <td>
                            {{ value['id'] }}
                        </td>
                        <td>
                            {{ value['name'] }}
                        </td>
                        <td>
                            <img :src="value['head_pic']" style="height: 60px;">
                        </td>
                        <td>
                            {{ value['salary'] }}
                        </td>
                        <td>
                            {{ value['age'] }}
                        </td>
                        <td>
                            {{ value['sex'] }}
                        </td>
                        <td>
                            {{ value['birthday'] }}
                        </td>
                        <td>
                            {{ value['depart_name'] }}
                        </td>
                        <td>
                            <a href="javascript:void(0)" @click="del(value['id'], value['name'])">删除</a>&nbsp;<a
                            href="javascript:void(0)" @click="update_emp(value['id'])">修改</a>
                        </td>
                    </tr>
                </table>
                <p>
                    <input type="button" class="button" value="添加员工" @click="dialogFormVisible = true"/>
                </p>
            </div>
        </div>
        <div id="footer">
            <div id="footer_bg">
                ABC@126.com
            </div>
        </div>
        <el-dialog title="添加员工" :visible.sync="dialogFormVisible" width="700px">
            <el-form :model="form">
                <el-form-item label="名字" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="工资" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form.salary" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form.age" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="form.gender" placeholder="请选择性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-date-picker type="date" placeholder="请选择日期" format="yyyy年 MM月 dd日" v-model="form.birthday"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-select v-model="form.depart" placeholder="请选择部门">
                        <el-option label="财务部" value="1"></el-option>
                        <el-option label="研发部" value="2"></el-option>
                        <el-option label="人力部" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add_emp">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改员工" :visible.sync="dialogFormVisible1" width="700px">
            <el-form :model="form1">
                <el-form-item label="id" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form1.id" autocomplete="off" readonly></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="名字" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form1.name" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="工资" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form1.salary" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-input v-model="form1.age" autocomplete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="form1.gender" placeholder="请选择性别">
                        <el-option label="男" value=0></el-option>
                        <el-option label="女" value=1></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                    <el-col :span="21">
                        <el-date-picker type="date" placeholder="请选择需要修改的日期" format="yyyy年 MM月 dd日"
                                        v-model="form.birthday"
                                        value-format="yyyy-MM-dd"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-select v-model="form1.depart" placeholder="请选择部门">
                        <el-option label="财务部" value=1></el-option>
                        <el-option label="研发部" value=2></el-option>
                        <el-option label="人力部" value=3></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            name: '',
            emp_list: '',
            dialogTableVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible: false,
            form: {
                name: '',
                salary: '',
                age: '',
                gender: '',
                birthday: '',
                depart: '',
            },
            form1: {
                id: '',
                name: '',
                salary: '',
                age: '',
                gender: '',
                birthday: '',
                depart: '',
            },
            formLabelWidth: '90px'
        }
    },
    created() {
        if (sessionStorage.name !== undefined) {
            this.name = sessionStorage.name;
            this.get_emp_list();
        } else {
            this.$message({
                showClose: true,
                message: '对不起，您还未登录，请登录后在访问!',
                type: 'error'
            });
            this.$router.push("/");
        }
    },
    methods: {
        logout() {
            this.$confirm('此操作将退出登录, 是否继续?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!',
                });
                sessionStorage.removeItem('name');
                this.$router.push('/');
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '您已取消退出！'
                });
            });
        },
        get_emp_list() {
            this.$axios({
                url: 'http://127.0.0.1:8000/emplist/',
                method: 'get',
            }).then(res => {
                // console.log(res);
                this.emp_list = res.data;
            }).catch(error => {
                console.log(error);
            })
        },
        del(id, name) {
            this.$confirm('此操作将永久删除 ' + name + ' 员工, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                    url: 'http://127.0.0.1:8000/emplist/' + id + '/',
                    method: 'delete',
                }).then(res => {
                    // console.log(res);
                    this.get_emp_list();
                    // this.$router.push('/index');
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除!'
                });
            });
        },
        add_emp() {
            this.$axios({
                url: 'http://127.0.0.1:8000/emplist/',
                method: 'post',
                data: {
                    name: this.form.name,
                    salary: this.form.salary,
                    age: this.form.age,
                    gender: this.form.gender,
                    birthday: this.form.birthday,
                    depart: this.form.depart,
                }
            }).then(res => {
                // console.log(res);
                this.dialogFormVisible = false;
                this.get_emp_list();
                this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.form.name = '';
                this.form.salary = '';
                this.form.birthday = '';
                this.form.depart = '';
                this.form.age = '';
                this.form.gender = '';
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '添加失败!'
                });
            });
        },
        update_emp(id) {
            this.dialogFormVisible1 = true;
            this.$axios({
                url: 'http://127.0.0.1:8000/emplist/' + id + '/',
                method: 'get',
            }).then(res => {
                // console.log(res.data);
                this.form1.id = parseInt(res.data['id']);
                this.form1.name = res.data['name'];
                this.form1.salary = res.data['salary'];
                this.form1.age = res.data['age'];
                this.form1.gender = parseInt(res.data['gender']);
                this.form1.birthday = res.data['birthday'];
                this.form1.depart = parseInt(res.data['depart']);
            }).catch(error => {
                console.log(error);
            })
        },
        update() {
            this.$axios({
                url: 'http://127.0.0.1:8000/emplist/' + this.form1.id + '/',
                method: 'patch',
                data: {
                    id: this.form1.id,
                    name: this.form1.name,
                    salary: this.form1.salary,
                    age: this.form1.age,
                    gender: this.form1.gender,
                    birthday: this.form1.birthday,
                    depart: this.form1.depart,
                }
            }).then(res => {
                console.log(res);
                this.dialogFormVisible = false;
                this.get_emp_list();
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                this.dialogFormVisible1 = false;
            }).catch(error => {
                console.log(error);
                this.$message({
                    type: 'error',
                    message: '修改失败!'
                });
            });
        }
    },
}
</script>

<style scoped>

</style>
