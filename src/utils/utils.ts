import { parse } from 'querystring';
import routes from '../../config/routes'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const saveUserInfo = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    localStorage.setItem('user', '')
  }
}

export const getUserInfo = () => {
  const userStr = localStorage.getItem('user')
  if(userStr) {
    return JSON.parse(userStr)
  }
  return null
}

export const getAllAuthList = () => {
  console.log(routes)
  let auth = []
  function filterRoute(routes) {
    routes.forEach(item => {
      if(item.routes) {
        filterRoute(item.routes)
      } else {
        if(item.authority) {
          auth.push({label: item.name, auth: item.authority})
        }
      }
    })
    return auth
  }
  return filterRoute(routes)
}
export const getUserCompId = () => {
  const user = getUserInfo()
  if(user) {
    return user.compId
  }
  return null
}
const getUserRole = () => {
  const user = getUserInfo()
  if(user) {
    return user.role
  }
  return []
}

export const getCurrentAuthList = () => {
  const role = getUserRole()
  const superAuth = '-2'
  const allAuthList = getAllAuthList()
  if(role.includes(superAuth)) {
    return allAuthList
  }
  return allAuthList.filter(item => item.auth !== 'company')
}

export const getAllAuthCode = () => {
  const role = getUserRole()
  console.log('role---', role)
  const superAuth = '-2'
  const allAuthList = getAllAuthList()
  const authCodeList = allAuthList.map(item => item.auth)
  if(role.includes(superAuth)) {
    return authCodeList
  }
  return authCodeList.filter(auth => auth !== 'company')
}

export const getCurrentAuth = (role: string[], auth: string[]):string[] => {
  const superAuth = '-2'
  const adminAuth = '-1'
  const allAuthCode = getAllAuthCode()
  // 如果不是管理员
  const isAdmin = role.some(item => item === superAuth || item === adminAuth)
  if(!isAdmin) {
    return auth
  }
  return allAuthCode
}

let list = getAllAuthList()
console.log('list', list)

