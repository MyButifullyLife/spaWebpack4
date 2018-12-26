import projectConfig from '../project-config'
import test from  './js/test'
import  '../assest/css/index.scss'

if(projectConfig.isTest){

      console.log('这是测试环境')

}else{

      console.log('这是这是生产环境')

}
