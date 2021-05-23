using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
                sql = @"SELECT TOP 100 APP_NAME, CATEGORY, RATING, RATING_COUNT, INSTALLS_RANGE, FREE
                        FROM AppMarketingAnalysisData as AMAD
                        WHERE (APP_NAME = @APP_NAME OR @APP_NAME='')
                          AND ((RATING >= @RATING1 AND RATING <= @RATING2) OR (@RATING2 = 0))
                          AND ((RATING_COUNT >= @RATING_C1 AND RATING_COUNT <= @RATING_C2) OR (@RATING_C2 = 0))
                          AND RATING != @RATING_NO";
                sql = ListParaToSql(sql, amad, "CATEGORY"); 
                sql = ListParaToSql(sql, amad, "FREE");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //APP名稱
                    cmd.Parameters.Add(new SqlParameter("@APP_NAME", amad.APP_NAME == null ? string.Empty : amad.APP_NAME));
                    //評分
                    cmd.Parameters.Add(new SqlParameter("@RATING1", amad.RATING[0] ));
                    cmd.Parameters.Add(new SqlParameter("@RATING2", amad.RATING[1] ));
                    //未評分
                    cmd.Parameters.Add(new SqlParameter("@RATING_NO", amad.NO_RATING == null ? 0 : -1));
                    //評分數量
                    cmd.Parameters.Add(new SqlParameter("@RATING_C1", amad.MIN_RATING_COUNT));
                    cmd.Parameters.Add(new SqlParameter("@RATING_C2", amad.MAX_RATING_COUNT));

                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    Console.WriteLine(cmd.CommandText);
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
                //sql = @"SELECT TOP 1000 category,rating,free
                sql = @"SELECT top 100000 category,rating,case when free = 'TRUE' then 'true' else 'false' end as free
                        FROM AppMarketingAnalysisData as AMAD 
                        WHERE ((RATING_COUNT >= @RATING_C1 AND RATING_COUNT <= @RATING_C2) OR (@RATING_C2 = 0))
                          AND ((PRICE >= @PRICE_1 AND PRICE <= @PRICE_2) OR (@PRICE_2 = 0))
                        ";
                sql = ListParaToSql(sql, amad, "CATEGORY");
                sql = ListParaToSql(sql, amad, "FREE");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //評分數量
                    cmd.Parameters.Add(new SqlParameter("@RATING_C1", amad.MIN_RATING_COUNT));
                    cmd.Parameters.Add(new SqlParameter("@RATING_C2", amad.MAX_RATING_COUNT));
                    //APP價格
                    cmd.Parameters.Add(new SqlParameter("@PRICE_1", amad.MIN_PRICE));
                    cmd.Parameters.Add(new SqlParameter("@PRICE_2", amad.MAX_PRICE));

                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach(DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        rating = row["rating"].ToString(),
                        free = row["free"].ToString()
                    });
                }
            }
            else if (target == "Chart2")
            {
                sql = @"SELECT TOP 100000 category,rating_count as ratingcount
                        FROM AppMarketingAnalysisData as AMAD
                        WHERE ((RATING_COUNT >= @RATING_C1 AND RATING_COUNT <= @RATING_C2) OR (@RATING_C2 = 0))
                          AND ((PRICE >= @PRICE_1 AND PRICE <= @PRICE_2) OR (@PRICE_2 = 0))
                        ";
                sql = ListParaToSql(sql, amad, "CATEGORY");
                sql = ListParaToSql(sql, amad, "FREE");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //評分數量
                    cmd.Parameters.Add(new SqlParameter("@RATING_C1", amad.MIN_RATING_COUNT));
                    cmd.Parameters.Add(new SqlParameter("@RATING_C2", amad.MAX_RATING_COUNT));
                    //APP價格
                    cmd.Parameters.Add(new SqlParameter("@PRICE_1", amad.MIN_PRICE));
                    cmd.Parameters.Add(new SqlParameter("@PRICE_2", amad.MAX_PRICE));

                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(cmd);
                    sqlAdapter.Fill(dt);
                    conn.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new AppMarketingAnalysis.Model.StringResult()
                    {
                        category = row["category"].ToString(),
                        ratingcount = row["ratingcount"].ToString()
                    });
                }
            }
            else if (target == "Chart3")
            {
                sql = @"SELECT TOP 100000 category,INSTALLS_COUNT as installs, DEVELOPER_ID as developerId 
                        FROM AppMarketingAnalysisData as AMAD 
                        WHERE ((PRICE >= @PRICE_1 AND PRICE <= @PRICE_2) OR (@PRICE_2 = 0))
                        ";
                sql = ListParaToSql(sql, amad, "CATEGORY");
                sql = ListParaToSql(sql, amad, "FREE");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //APP價格
                    cmd.Parameters.Add(new SqlParameter("@PRICE_1", amad.MIN_PRICE));
                    cmd.Parameters.Add(new SqlParameter("@PRICE_2", amad.MAX_PRICE));

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
                sql = @"SELECT TOP 100000 category,INSTALLS_COUNT as maximumInstalls,RATING_COUNT as ratingcount,price  
                        FROM AppMarketingAnalysisData as AMAD 
                        WHERE ((RATING_COUNT >= @RATING_C1 AND RATING_COUNT <= @RATING_C2) OR (@RATING_C2 = 0))
                          AND ((PRICE >= @PRICE_1 AND PRICE <= @PRICE_2) OR (@PRICE_2 = 0))
                        ";
                sql = ListParaToSql(sql, amad, "CATEGORY");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //評分數量
                    cmd.Parameters.Add(new SqlParameter("@RATING_C1", amad.MIN_RATING_COUNT));
                    cmd.Parameters.Add(new SqlParameter("@RATING_C2", amad.MAX_RATING_COUNT));
                    //APP價格
                    cmd.Parameters.Add(new SqlParameter("@PRICE_1", amad.MIN_PRICE));
                    cmd.Parameters.Add(new SqlParameter("@PRICE_2", amad.MAX_PRICE));

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
                        ratingcount = row["ratingcount"].ToString(),
                        price = row["price"].ToString()
                    });
                }
            }
            else if (target == "Chart5")
            {
                sql = @"SELECT TOP 100000 category,RELEASED as Released 
                        FROM AppMarketingAnalysisData as AMAD
                        WHERE ((PRICE >= @PRICE_1 AND PRICE <= @PRICE_2) OR (@PRICE_2 = 0))
                          AND ( RELEASED >= @RELEASED_1 AND RELEASED<= @RELEASED_2)
                        ";
                sql = ListParaToSql(sql, amad, "CATEGORY");
                sql = ListParaToSql(sql, amad, "FREE");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //APP價格
                    cmd.Parameters.Add(new SqlParameter("@PRICE_1", amad.MIN_PRICE));
                    cmd.Parameters.Add(new SqlParameter("@PRICE_2", amad.MAX_PRICE));
                    //APP發行日期
                    cmd.Parameters.Add(new SqlParameter("@RELEASED_1", amad.MIN_RELEASED));
                    cmd.Parameters.Add(new SqlParameter("@RELEASED_2", amad.MAX_RELEASED));

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
                        Released = row["Released"].ToString()
                    });
                }
            }
            else if (target == "Chart6")
            {
                //sql = @"SELECT TOP 1000 category, INSTALLS_COUNT as install, free 
                sql = @"SELECT TOP 100000 category, INSTALLS_COUNT as install, case when free = 'TRUE' then 'true' else 'false' end as free
                        FROM AppMarketingAnalysisData as AMAD 
                        WHERE (1 = 1 ) 
                        ";
                sql = ListParaToSql(sql, amad, "CATEGORY");
                sql = ListParaToSql(sql, amad, "INSTALLS_RANGE");

                using (SqlConnection conn = new SqlConnection(this.GetDBConnectionString()))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand(sql, conn);

                    //APP價格
                    cmd.Parameters.Add(new SqlParameter("@PRICE_1", amad.MIN_PRICE));
                    cmd.Parameters.Add(new SqlParameter("@PRICE_2", amad.MAX_PRICE));

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

        /// 處理sql參數的陣列
        private string ListParaToSql(string sql, Model.AppMarketingAnalysisData amad, string target)
        {
            //分類
            if (target == "CATEGORY")
            {
                if (amad.CATEGORY == null)
                    return sql;
                string SQLstart = @" AND UPPER(CATEGORY) IN (UPPER(' ";
                string SQLend = @"')) ";
                for(int i = 0; i < amad.CATEGORY.Length; i++)
                {
                    if (i != 0)
                        SQLstart += @"'), UPPER('";
                    SQLstart += amad.CATEGORY[i];
                }
                sql = sql + SQLstart + SQLend;
            }
            //下載數量範圍
            else if(target == "INSTALLS_RANGE")
            {
                if (amad.MAX_INSTALLS_RANGE == null || amad.MIN_INSTALLS_RANGE == null)
                    return sql;
                List<string> range = new List<string> {"0+","1+","10+","100+","1,000+","10,000+",
                                                        "100,000+" ,"1,000,000+","10,000,000+",
                                                        "100,000,000+","1,000,000,000+"};
                int s = new int();
                int e = new int();
                for(int i = 0;i < range.Count; i++)
                {
                    if (amad.MIN_INSTALLS_RANGE == range[i])
                        s = i;
                    if (amad.MAX_INSTALLS_RANGE == range[i])
                        e = i;
                }
                string SQLAdd = @" AND INSTALLS_RANGE IN ('";
                for (int i = s ; i <= e; i++)
                {
                    if (i != 0)
                        SQLAdd += @"','";
                    SQLAdd += range[i];
                }
                SQLAdd += @"') ";
                sql += SQLAdd;
            }
            //APP是免費還是付費
            else if(target == "FREE")
            {
                if (amad.FREE == null)
                    return sql;
                string SQLAdd = @" AND FREE IN ('";
                for (int i = 0; i < amad.FREE.Length; i++)
                {
                    if (i != 0)
                        SQLAdd += @"', '";
                    SQLAdd += amad.FREE[i];
                }
                SQLAdd += @"') ";
                sql += SQLAdd;
            }
            return sql;
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
