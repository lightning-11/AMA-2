using System.Collections.Generic;
using AppMarketingAnalysis.Model;
using System.Web.Mvc;

namespace AppMarketingAnalysis.Dao
{
    public interface IAppMarketingAnalysisDao
    {
        List<string> GetAutoCompleteData(string target);
        List<Model.StringResult> GetAppSearch(AppMarketingAnalysisData amad, string target);
        List<SelectListItem> SetDropDownListData(string target);
    }
}