using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppMarketingAnalysis.Model
{
    public class StringResult
    {
        //APP名稱(由資料庫流水號自動產生)
        [DisplayName("APP排序")]
        public string AppName { get; set; }

        //APP名稱(由資料庫流水號自動產生)
        [DisplayName("APP排序")]
        public string APP_NAME { get; set; }

        //APP分類
        [DisplayName("APP分類")]
        public string CATEGORY { get; set; }

        //平均評分
        [DisplayName("評分")]
        public string RATING { get; set; }

        //評分數量
        [DisplayName("評分數量")]
        public string RATING_COUNT { get; set; }

        //下載數量範圍
        [DisplayName("下載數量範圍")]
        public string INSTALLS_RANGE { get; set; }

        //APP是免費還是付費
        [DisplayName("APP是免費還是付費")]
        public string FREE { get; set; }

        //APP分類
        [DisplayName("APP分類")]
        public string category { get; set; }

        //評分數量
        [DisplayName("評分")]
        public string rating { get; set; }

        //評分數量
        [DisplayName("評分數量")]
        public string ratingcount { get; set; }

        //下載數量
        [DisplayName("下載數量")]
        public string installs { get; set; }

        //開發者名稱
        [DisplayName("開發者名稱")]
        public string developerId { get; set; }

        //篩選最大下載數量(前端)
        [DisplayName("篩選最大下載數量")]
        public string maximumInstalls { get; set; }

        //APP價格
        [DisplayName("APP價格")]
        public string price { get; set; }

        //APP發行日期
        [DisplayName("APP發行日期")]
        public string RELEASED { get; set; }

        //APP是免費還是付費
        [DisplayName("APP是免費還是付費")]
        public string free { get; set; }

        //下載數量
        [DisplayName("下載數量")]
        public string install { get; set; }
    }
}