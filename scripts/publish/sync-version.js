/**
 * 项目Version同步脚本
 * 2019-08-02
 * 
 */

const path = require('path');
const fs = require("fs");

/**
 * 读取项目package.json文件,开始同步
 * @param {String} filepath     项目package.json文件路径
 * @param {String} childModuleDir   子项目（模块）位置
 */
function startSync(filepath, childModuleDir) {
    fs.readFile(filepath, "UTF-8", function (error, data) {
        if (error) {
            console.log("项目package.json文件读取错误：" + error)
            return;
        } else {
            const res = JSON.parse(data)
            const projectInfo = {
                "name": "",
                "version": ""
            }
            projectInfo.name = res.name
            projectInfo.version = res.version
            updateVersion(appRoot + "/" + childModuleDir, projectInfo)
        }
    })
}

/**
 * 遍历子模块package.json文件,同步version与项目一致
 * @param {String} projectpath  子项目位置
 * @param {any} projectInfo     读取的根项目name,version信息
 */
function updateVersion(projectpath, projectInfo) {
    var pa = fs.readdirSync(projectpath)
    pa.forEach(function (ele, index) {
        var info = fs.statSync(projectpath + "/" + ele)
        if (info.isDirectory()) {
            //向下迭代寻找package.json文件  
            updateVersion(projectpath + "/" + ele, projectInfo);
        } else {
            if (ele === "package.json") {
                fs.readFile(projectpath + "/" + ele, "UTF-8", function (error, data) {
                    if (error) {
                        console.error(error)
                    } else {
                        var info = JSON.parse(data)
                        //更新引用模块的Version信息
                        info.version = projectInfo.version
                        for (var key in info.peerDependencies) {
                            if (key.indexOf(projectInfo.name) != -1) {
                                info.peerDependencies[key] = "^" + projectInfo.version
                            }
                        }
                        reWriteFile(projectpath + "/" + ele, info)
                    }
                })
            }
        }
    })
}

/**
 * 重写package.json文件
 * @param {String} childFilePath 子项目（模块）下的package.json路径
 * @param {any} content   更新Version后的package.json内容
 */

function reWriteFile(childFilePath, content) {
    fs.writeFile(childFilePath, JSON.stringify(content, null, "\t"), {
        "encoding": "UTF-8"
    }, function (error) {
        if (error) {
            console.error(childFilePath + " 文件重写错误" + error)
        } else {
            console.log("=====" + childFilePath + " Version 同步成功")
        }
    })
}

//定位至项目根目录
const appRoot = path.resolve(__dirname, '../../');
//获取项目package.json文件
const filepath = path.join(appRoot, "package.json")
//开始同步
startSync(filepath, "projects")