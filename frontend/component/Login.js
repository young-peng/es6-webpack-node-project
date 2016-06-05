/** * Created by pengyao on 16/5/28. */import React from "react";import {Link} from 'react-router';import jQuery from "jquery";import {login} from "../lib/client";const mtStyle = {    marginTop:20}export default class Login extends React.Component{    constructor(props) {        super(props);        this.state = {}    }    handleChange(name,e) {        this.state[name] = e.target.value;    }    handleLogin(e) {        var $btn = jQuery(e.target);        $btn.button("loading");        login(this.state.name,this.state.password)            .then(ret=>{                $btn.button("reset");                alert("登录成功");                location.replace("/")            })            .catch(err=>{                $btn.button("reset");                alert(err);            })    }    render(){        const isBind = this.props.location.query.bind === '1' ? true : false;        return (        <div className="panel panel-primary">            <div className="panel-heading">登录</div>            <div className="panel-body">                <form className="form-horizontal">                    <div className="form-group">                        <label htmlFor="name" className="col-sm-2 control-label">用户名</label>                        <div className="col-sm-10">                            <input type="text" className="form-control" id="name" placeholder="用户名" onChange={this.handleChange.bind(this,'name')}/>                        </div>                    </div>                    <div className="form-group">                        <label htmlFor="password" className="col-sm-2 control-label">密码</label>                        <div className="col-sm-10">                            <input type="password" className="form-control" id="password" placeholder="密码" onChange={this.handleChange.bind(this,'password')}/>                        </div>                    </div>                    <div className="form-group">                        <div className="col-sm-offset-2 col-sm-10">                            <button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)}>{isBind ? '绑定' : '登录'}</button>                            &nbsp;                            {isBind ? null : <a href="/auth/github" className="btn btn-info">使用GitHub帐号登录</a>}                            <span className="pull-right"><Link to="/reset_password">忘记密码?</Link></span>                        </div>                    </div>                </form>            </div>        </div>        )    }}