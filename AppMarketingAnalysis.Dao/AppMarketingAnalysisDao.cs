using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AppMarketingAnalysis.Dao
{
    public class AppMarketingAnalysisDao : IAppMarketingAnalysisDao
    {
        /// 取得DB連線字串
        /// <returns></returns>
        private string GetDBConnectionString()
        {
            return AppMarketingAnalysis.Common.ConfigTool.GetDBConnectionString("DBConn");
        }

        /// <summary>
        /// 拿取AutoCompleteData的資料
        /// </summary>
        /// <returns></returns>
        public List<string> GetAutoCompleteData(string target)
        {
            DataTable dt = new DataTable();
            string sql = "";
            if (target == "AppName"){
                sql = @"SELECT DISTINCT AMAD.APP_NAME
                           FROM AppMarketingAnalysisData as AMAD";
            }else if (target == "DeveloperId"){
                sql = @"SELECT DISTINCT AMAD.DEVELOPER_ID
                           FROM AppMarketingAnalysisData as AMAD";
            }
            using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(sql, conn);
                SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                sqlAdapter.Fill(dt);
                conn.Close();
            }
            List<string> autoCompleteData = new List<string>();
            foreach (DataRow row in dt.Rows)
            {
                if (target == "AppName"){
                    autoCompleteData.Add(row.Field<String>("APP_NAME"));
                }else if (target == "DeveloperId") {
                    autoCompleteData.Add(row.Field<String>("DEVELOPER_ID"));
                }
            }
            return autoCompleteData;
        }

        /// <summary>
        /// 依照搜尋條件取得App資料
        /// </summary>
        /// <param name="amad"></param>
        /// <returns></returns>
        public List<Model.StringResult> GetAppSearch(Model.AppMarketingAnalysisData amad, string target)
        {
            DataTable dt = new DataTable();
            List<Model.StringResult> result = new List<Model.StringResult>();
            string sql = "";
            if (target == "AppGrid")
            {
                sql = @"SELECT APP_NAME, CATEGORY, RATING, RATING_COUNT, INSTALLS_RANGE, FREE
                        FROM AppMarketingAnalysisData as AMAD";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        APP_NAME = row["APP_NAME"].ToString(),
                        CATEGORY = row["CATEGORY"].ToString(),
                        RATING = row["RATING"].ToString(),
                        RATING_COUNT = row["RATING_COUNT"].ToString(),
                        INSTALLS_RANGE = row["INSTALLS_RANGE"].ToString(),
                        FREE = row["FREE"].ToString()
                    });
                }
            }
            else if (target == "Chart1")
            {
                sql = @"SELECT category,rating
                        FROM AppMarketingAnalysisData as AMAD 
                        ";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach(DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        rating = row["rating"].ToString()
                    });
                }
            }
            else if (target == "Chart2")
            {
                sql = @"SELECT category,rating_count as ratingcount
                        FROM AppMarketingAnalysisData as AMAD 
                        ";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        rating = row["ratingcount"].ToString()
                    });
                }
            }
            else if (target == "Chart3")
            {
                sql = @"SELECT category,INSTALLS_COUNT as installs, DEVELOPER_ID as developerId 
                        FROM AppMarketingAnalysisData as AMAD 
                        ";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        installs = row["installs"].ToString(),
                        developerId = row["developerId"].ToString()
                    });
                }
            }
            else if (target == "Chart4")
            {
                sql = @"SELECT category,INSTALLS_COUNT as maximumInstalls,RATING_COUNT as ratingcount 
                        FROM AppMarketingAnalysisData as AMAD 
                        ";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        maximumInstalls = row["maximumInstalls"].ToString(),
                        ratingcount = row["ratingcount"].ToString()
                    });
                }
            }
            else if (target == "Chart5")
            {
                sql = @"SELECT category,RELEASED as Released 
                        FROM AppMarketingAnalysisData as AMAD 
                        ";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        rating = row["Released"].ToString()
                    });
                }
            }
            else if (target == "Chart6")
            {
                sql = @"SELECT category, free, INSTALLS_COUNT as install 
                        FROM AppMarketingAnalysisData as AMAD 
                        ";

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    //cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        free = row["free"].ToString(),
                        install = row["install"].ToString()
                    });
                }
            }
            return result;
        }

        /// Map資料進List (AppData)
        /// <param name="AppDataTable"></param>
        /// <returns></returns>
        private List<AppMarketingAnalysis.Model.AppMarketingAnalysisData> MapAppDataToList(DataTable AppDataTable)
        {
            List<AppMarketingAnalysis.Model.AppMarketingAnalysisData> result = new List<AppMarketingAnalysis.Model.AppMarketingAnalysisData>();
            foreach (DataRow row in AppDataTable.Rows)
            {
                result.Add(new AppMarketingAnalysis.Model.AppMarketingAnalysisData()
                {
                    APP_NAME = row["APP_NAME"].ToString(),

                });
            }
            return result;
        }

        /// <summary>
        /// 設定下拉式選單資料
        /// </summary>
        /// <param name="target">要拿取的資料</param>
        /// <returns></returns>
        public List<SelectListItem> SetDropDownListData(string target)
        {
            DataTable dt = new DataTable();
            string sql = "";
            if (target == "Category"){  //拿取APP類別資料
                sql = @"Select DISTINCT AMAD.CATEGORY as Text, AMAD.CATEGORY as Value
                               From AppMarketingAnalysisData as AMAD";
            }else if (target == "InstallsRange"){    //拿取APP下載數量範圍資料
                sql = @"Select DISTINCT AMAD.INSTALLS_RANGE as Text, AMAD.INSTALLS_RANGE as Value
                               From AppMarketingAnalysisData as AMAD";
            }
            using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(sql, conn);
                SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                sqlAdapter.Fill(dt);
                conn.Close();
            }
            return this.MapDropDownListData(dt);
        }

/// <summary>
/// Maping 代碼資料
/// </summary>
/// <param name="dt"></param>
/// <returns></returns>
private List<SelectListItem> MapDropDownListData(DataTable dt)
        {
            List<SelectListItem> result = new List<SelectListItem>();
            foreach (DataRow row in dt.Rows)
            {
                result.Add(new SelectListItem()
                {
                    Text = row["Text"].ToString(),
                    Value = row["Value"].ToString()
                });
            }
            return result;
        }

    }
}
