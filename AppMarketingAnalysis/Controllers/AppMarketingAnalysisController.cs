using System;
using System.Collections.Generic;
using System.Web.Mvc;
using AppMarketingAnalysis.Service;
using AppMarketingAnalysis.Model;
using Newtonsoft.Json;

namespace AppMarketingAnalysis.Controllers
{
    public class AppMarketingAnalysisController : Controller
    {
        private IAppMarketingAnalysisService AppMarketingAnalysisService { get; set; }

        /// <summary>
        /// 開啟Index首頁
        /// GET
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 拿取下拉式選單資料
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetDropDownListClassData(string target)
        {
            List<SelectListItem> DDLData = AppMarketingAnalysisService.SetDropDownListData(target);  //拿取下拉式選單資料
            return Json(DDLData);
        }

        /// <summary>
        /// 拿取AppNameAutoComplete的資料
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AutoCompleteData(string target)
        {
            var AutoCompleteData = AppMarketingAnalysisService.GetAutoCompleteData(target); //拿取APP_NAME資料
            //return Json(AutoCompleteData); 
            return Content(JsonConvert.SerializeObject(AutoCompleteData), "application/json");
        }

        /// <summary>
        /// App查詢
        /// </summary>
        /// <param name="amad"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetAppSearch(AppMarketingAnalysisData amad, string target) //接收search的資料
        {
            List<AppMarketingAnalysisData> searchResult =  AppMarketingAnalysisService.GetAppSearch(amad, target);
            return Json(searchResult);
        }
    }
}