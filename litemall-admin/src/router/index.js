import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true,
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "app.menu.dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/user",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "userManage",
    meta: {
      title: "app.menu.user",
      icon: "chart",
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/user/user"),
        name: "user",
        meta: {
          perms: ["GET /proxy/3000/admin/user/list"],
          title: "app.menu.user_user",
          noCache: true,
        },
      },
      {
        path: "address",
        component: () => import("@/views/user/address"),
        name: "address",
        meta: {
          perms: ["GET /proxy/3000/admin/address/list"],
          title: "app.menu.user_address",
          noCache: true,
        },
      },
      {
        path: "collect",
        component: () => import("@/views/user/collect"),
        name: "collect",
        meta: {
          perms: ["GET /proxy/3000/admin/collect/list"],
          title: "app.menu.user_collect",
          noCache: true,
        },
      },
      {
        path: "footprint",
        component: () => import("@/views/user/footprint"),
        name: "footprint",
        meta: {
          perms: ["GET /proxy/3000/admin/footprint/list"],
          title: "app.menu.user_footprint",
          noCache: true,
        },
      },
      {
        path: "history",
        component: () => import("@/views/user/history"),
        name: "history",
        meta: {
          perms: ["GET /proxy/3000/admin/history/list"],
          title: "app.menu.user_history",
          noCache: true,
        },
      },
      {
        path: "feedback",
        component: () => import("@/views/user/feedback"),
        name: "feedback",
        meta: {
          perms: ["GET /proxy/3000/admin/feedback/list"],
          title: "app.menu.user_feedback",
          noCache: true,
        },
      },
    ],
  },

  {
    path: "/mall",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "mallManage",
    meta: {
      title: "app.menu.mall",
      icon: "chart",
    },
    children: [
      {
        path: "region",
        component: () => import("@/views/mall/region"),
        name: "region",
        meta: {
          title: "app.menu.mall_region",
          noCache: true,
        },
      },
      {
        path: "brand",
        component: () => import("@/views/mall/brand"),
        name: "brand",
        meta: {
          perms: [
            "GET /proxy/3000/admin/brand/list",
            "POST /proxy/3000/admin/brand/create",
            "GET /proxy/3000/admin/brand/read",
            "POST /proxy/3000/admin/brand/update",
            "POST /proxy/3000/admin/brand/delete",
          ],
          title: "app.menu.mall_brand",
          noCache: true,
        },
      },
      {
        path: "category",
        component: () => import("@/views/mall/category"),
        name: "category",
        meta: {
          perms: [
            "GET /proxy/3000/admin/category/list",
            "POST /proxy/3000/admin/category/create",
            "GET /proxy/3000/admin/category/read",
            "POST /proxy/3000/admin/category/update",
            "POST /proxy/3000/admin/category/delete",
          ],
          title: "app.menu.mall_category",
          noCache: true,
        },
      },
      {
        path: "order",
        component: () => import("@/views/mall/order"),
        name: "order",
        meta: {
          perms: [
            "GET /proxy/3000/admin/order/list",
            "GET /proxy/3000/admin/order/detail",
            "POST /proxy/3000/admin/order/ship",
            "POST /proxy/3000/admin/order/refund",
            "POST /proxy/3000/admin/order/delete",
            "POST /proxy/3000/admin/order/reply",
          ],
          title: "app.menu.mall_order",
          noCache: true,
        },
      },
      {
        path: "aftersale",
        component: () => import("@/views/mall/aftersale"),
        name: "aftersale",
        meta: {
          perms: [
            "GET /proxy/3000/admin/aftersale/list",
            "GET /proxy/3000/admin/aftersale/detail",
            "POST /proxy/3000/admin/order/receive",
            "POST /proxy/3000/admin/aftersale/complete",
            "POST /proxy/3000/admin/aftersale/reject",
          ],
          title: "app.menu.mall_aftersale",
          noCache: true,
        },
      },
      {
        path: "issue",
        component: () => import("@/views/mall/issue"),
        name: "issue",
        meta: {
          perms: [
            "GET /proxy/3000/admin/issue/list",
            "POST /proxy/3000/admin/issue/create",
            "GET /proxy/3000/admin/issue/read",
            "POST /proxy/3000/admin/issue/update",
            "POST /proxy/3000/admin/issue/delete",
          ],
          title: "app.menu.mall_issue",
          noCache: true,
        },
      },
      {
        path: "keyword",
        component: () => import("@/views/mall/keyword"),
        name: "keyword",
        meta: {
          perms: [
            "GET /proxy/3000/admin/keyword/list",
            "POST /proxy/3000/admin/keyword/create",
            "GET /proxy/3000/admin/keyword/read",
            "POST /proxy/3000/admin/keyword/update",
            "POST /proxy/3000/admin/keyword/delete",
          ],
          title: "app.menu.mall_keyword",
          noCache: true,
        },
      },
    ],
  },

  {
    path: "/goods",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "goodsManage",
    meta: {
      title: "app.menu.goods",
      icon: "chart",
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/goods/list"),
        name: "goodsList",
        meta: {
          perms: [
            "GET /proxy/3000/admin/goods/list",
            "POST /proxy/3000/admin/goods/delete",
          ],
          title: "app.menu.goods_list",
          noCache: true,
        },
      },
      {
        path: "create",
        component: () => import("@/views/goods/create"),
        name: "goodsCreate",
        meta: {
          perms: ["POST /proxy/3000/admin/goods/create"],
          title: "app.menu.goods_create",
          noCache: true,
        },
      },
      {
        path: "edit",
        component: () => import("@/views/goods/edit"),
        name: "goodsEdit",
        meta: {
          perms: [
            "GET /proxy/3000/admin/goods/detail",
            "POST /proxy/3000/admin/goods/update",
            "POST /proxy/3000/admin/goods/catAndBrand",
          ],
          title: "app.menu.goods_edit",
          noCache: true,
        },
        hidden: true,
      },
      {
        path: "comment",
        component: () => import("@/views/goods/comment"),
        name: "goodsComment",
        meta: {
          perms: [
            "GET /proxy/3000/admin/comment/list",
            "POST /proxy/3000/admin/comment/delete",
          ],
          title: "app.menu.goods_comment",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "/promotion",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "promotionManage",
    meta: {
      title: "app.menu.promotion",
      icon: "chart",
    },
    children: [
      {
        path: "ad",
        component: () => import("@/views/promotion/ad"),
        name: "ad",
        meta: {
          perms: [
            "GET /proxy/3000/admin/ad/list",
            "POST /proxy/3000/admin/ad/create",
            "GET /proxy/3000/admin/ad/read",
            "POST /proxy/3000/admin/ad/update",
            "POST /proxy/3000/admin/ad/delete",
          ],
          title: "app.menu.promotion_ad",
          noCache: true,
        },
      },
      {
        path: "coupon",
        component: () => import("@/views/promotion/coupon"),
        name: "coupon",
        meta: {
          perms: [
            "GET /proxy/3000/admin/coupon/list",
            "POST /proxy/3000/admin/coupon/create",
            "POST /proxy/3000/admin/coupon/update",
            "POST /proxy/3000/admin/coupon/delete",
          ],
          title: "app.menu.promotion_coupon",
          noCache: true,
        },
      },
      {
        path: "couponDetail",
        component: () => import("@/views/promotion/couponDetail"),
        name: "couponDetail",
        meta: {
          perms: [
            "GET /proxy/3000/admin/coupon/list",
            "GET /proxy/3000/admin/coupon/listuser",
          ],
          title: "app.menu.promotion_coupon_detail",
          noCache: true,
        },
        hidden: true,
      },
      {
        path: "topic",
        component: () => import("@/views/promotion/topic"),
        name: "topic",
        meta: {
          perms: [
            "GET /proxy/3000/admin/topic/list",
            "POST /proxy/3000/admin/topic/create",
            "GET /proxy/3000/admin/topic/read",
            "POST /proxy/3000/admin/topic/update",
            "POST /proxy/3000/admin/topic/delete",
          ],
          title: "app.menu.promotion_topic",
          noCache: true,
        },
      },
      {
        path: "topic-create",
        component: () => import("@/views/promotion/topicCreate"),
        name: "topicCreate",
        meta: {
          perms: ["POST /proxy/3000/admin/topic/create"],
          title: "app.menu.promotion_topic_create",
          noCache: true,
        },
        hidden: true,
      },
      {
        path: "topic-edit",
        component: () => import("@/views/promotion/topicEdit"),
        name: "topicEdit",
        meta: {
          perms: [
            "GET /proxy/3000/admin/topic/read",
            "POST /proxy/3000/admin/topic/update",
          ],
          title: "app.menu.promotion_topic_edit",
          noCache: true,
        },
        hidden: true,
      },
      {
        path: "groupon-rule",
        component: () => import("@/views/promotion/grouponRule"),
        name: "grouponRule",
        meta: {
          perms: [
            "GET /proxy/3000/admin/groupon/list",
            "POST /proxy/3000/admin/groupon/create",
            "POST /proxy/3000/admin/groupon/update",
            "POST /proxy/3000/admin/groupon/delete",
          ],
          title: "app.menu.promotion_groupon_rule",
          noCache: true,
        },
      },
      {
        path: "groupon-activity",
        component: () => import("@/views/promotion/grouponActivity"),
        name: "grouponActivity",
        meta: {
          perms: ["GET /proxy/3000/admin/groupon/listRecord"],
          title: "app.menu.promotion_groupon_activity",
          noCache: true,
        },
      },
    ],
  },

  {
    path: "/sys",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "sysManage",
    meta: {
      title: "app.menu.sys",
      icon: "chart",
    },
    children: [
      {
        path: "admin",
        component: () => import("@/views/sys/admin"),
        name: "admin",
        meta: {
          perms: [
            "GET /proxy/3000/admin/proxy/3000/admin/list",
            "POST /proxy/3000/admin/proxy/3000/admin/create",
            "POST /proxy/3000/admin/proxy/3000/admin/update",
            "POST /proxy/3000/admin/proxy/3000/admin/delete",
          ],
          title: "app.menu.sys_admin",
          noCache: true,
        },
      },
      {
        path: "notice",
        component: () => import("@/views/sys/notice"),
        name: "sysNotice",
        meta: {
          perms: [
            "GET /proxy/3000/admin/notice/list",
            "POST /proxy/3000/admin/notice/create",
            "POST /proxy/3000/admin/notice/update",
            "POST /proxy/3000/admin/notice/delete",
          ],
          title: "app.menu.sys_notice",
          noCache: true,
        },
      },
      {
        path: "log",
        component: () => import("@/views/sys/log"),
        name: "log",
        meta: {
          perms: ["GET /proxy/3000/admin/log/list"],
          title: "app.menu.sys_log",
          noCache: true,
        },
      },
      {
        path: "role",
        component: () => import("@/views/sys/role"),
        name: "role",
        meta: {
          perms: [
            "GET /proxy/3000/admin/role/list",
            "POST /proxy/3000/admin/role/create",
            "POST /proxy/3000/admin/role/update",
            "POST /proxy/3000/admin/role/delete",
            "GET /proxy/3000/admin/role/permissions",
            "POST /proxy/3000/admin/role/permissions",
          ],
          title: "app.menu.sys_role",
          noCache: true,
        },
      },
      {
        path: "os",
        component: () => import("@/views/sys/os"),
        name: "os",
        meta: {
          perms: [
            "GET /proxy/3000/admin/storage/list",
            "POST /proxy/3000/admin/storage/create",
            "POST /proxy/3000/admin/storage/update",
            "POST /proxy/3000/admin/storage/delete",
          ],
          title: "app.menu.sys_os",
          noCache: true,
        },
      },
    ],
  },

  {
    path: "/config",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "configManage",
    meta: {
      title: "app.menu.config",
      icon: "chart",
    },
    children: [
      {
        path: "mall",
        component: () => import("@/views/config/mall"),
        name: "configMall",
        meta: {
          perms: [
            "GET /proxy/3000/admin/config/mall",
            "POST /proxy/3000/admin/config/mall",
          ],
          title: "app.menu.config_mall",
          noCache: true,
        },
      },
      {
        path: "express",
        component: () => import("@/views/config/express"),
        name: "configExpress",
        meta: {
          perms: [
            "GET /proxy/3000/admin/config/express",
            "POST /proxy/3000/admin/config/express",
          ],
          title: "app.menu.config_express",
          noCache: true,
        },
      },
      {
        path: "order",
        component: () => import("@/views/config/order"),
        name: "configOrder",
        meta: {
          perms: [
            "GET /proxy/3000/admin/config/order",
            "POST /proxy/3000/admin/config/order",
          ],
          title: "app.menu.config_order",
          noCache: true,
        },
      },
      {
        path: "wx",
        component: () => import("@/views/config/wx"),
        name: "configWx",
        meta: {
          perms: [
            "GET /proxy/3000/admin/config/wx",
            "POST /proxy/3000/admin/config/wx",
          ],
          title: "app.menu.config_wx",
          noCache: true,
        },
      },
    ],
  },

  {
    path: "/stat",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "statManage",
    meta: {
      title: "app.menu.stat",
      icon: "chart",
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/stat/user"),
        name: "statUser",
        meta: {
          perms: ["GET /proxy/3000/admin/stat/user"],
          title: "app.menu.stat_user",
          noCache: true,
        },
      },
      {
        path: "order",
        component: () => import("@/views/stat/order"),
        name: "statOrder",
        meta: {
          perms: ["GET /proxy/3000/admin/stat/order"],
          title: "app.menu.stat_order",
          noCache: true,
        },
      },
      {
        path: "goods",
        component: () => import("@/views/stat/goods"),
        name: "statGoods",
        meta: {
          perms: ["GET /proxy/3000/admin/stat/goods"],
          title: "app.menu.stat_goods",
          noCache: true,
        },
      },
    ],
  },
  {
    path: "external-link",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    name: "externalLink",
    meta: {
      title: "app.menu.external_link",
      icon: "link",
    },
    children: [
      {
        path: "https://cloud.tencent.com/product/cos",
        meta: { title: "app.menu.external_link_tencent_cos", icon: "link" },
      },
      {
        path: "https://cloud.tencent.com/product/sms",
        meta: { title: "app.menu.external_link_tencent_sms", icon: "link" },
      },
      {
        path: "https://pay.weixin.qq.com/index.php/core/home/login",
        meta: { title: "app.menu.external_link_weixin_pay", icon: "link" },
      },
      {
        path: "https://mpkf.weixin.qq.com/",
        meta: { title: "app.menu.external_link_weixin_mpkf", icon: "link" },
      },
      {
        path: "https://www.alibabacloud.com/zh/product/oss",
        meta: { title: "app.menu.external_link_alibaba_oss", icon: "link" },
      },
      {
        path: "https://www.qiniu.com/products/kodo",
        meta: { title: "app.menu.external_link_qiniu_kodo", icon: "link" },
      },
      {
        path: "http://www.kdniao.com/api-track",
        meta: { title: "app.menu.external_link_kdniao_api", icon: "link" },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "noredirect",
    alwaysShow: true,
    children: [
      {
        path: "password",
        component: () => import("@/views/profile/password"),
        name: "password",
        meta: { title: "app.menu.profile_password", noCache: true },
      },
      {
        path: "notice",
        component: () => import("@/views/profile/notice"),
        name: "notice",
        meta: { title: "app.menu.profile_notice", noCache: true },
      },
    ],
    hidden: true,
  },

  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
