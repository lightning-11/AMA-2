using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AppMarketingAnalysis.Service
{
    public class AppMarketingAnalysisService : IAppMarketingAnalysisService
    {
        private AppMarketingAnalysis.Dao.IAppMarketingAnalysisDao AppMarketingAnalysisDao { get; set; }

        //拿取AutoCompleteData的資料
        public List<string> GetAutoCompleteData(string target)
        {
            return AppMarketingAnalysisDao.GetAutoCompleteData(target);
        }

        //依照搜尋條件取得App資料
        public List<Model.StringResult> GetAppSearch(AppMarketingAnalysis.Model.AppMarketingAnalysisData amad, string target)
        {
            return AppMarketingAnalysisDao.GetAppSearch(amad, target);
        }

        //設定下拉式選單資料
        public List<SelectListItem> SetDropDownListData(string target)
        {
            return AppMarketingAnalysisDao.SetDropDownListData(target);
        }
    }
}
