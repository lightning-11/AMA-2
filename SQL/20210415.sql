--            陳偉華 新增資料庫建構語法
-- 2021/04/15 錢  敬 修改資料庫建構語法
USE [App_data]
GO
/****** Object:  Table [dbo].[AppMarketingAnalysisData]    Script Date: 2021/4/15 上午 12:45:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AppMarketingAnalysisData](
	[APP_SORT] [int] IDENTITY(1,1) NOT NULL,
	[APP_NAME] [nvarchar](255) NOT NULL,
	[CATEGORY] [nvarchar](50) NOT NULL,
	[RATING] [numeric](20, 0) NULL,
	[RATING_COUNT] [numeric](20, 0) NOT NULL,
	[INSTALLS_RANGE] [nvarchar](50) NOT NULL,
	[INSTALLS_COUNT] [numeric](20, 0) NOT NULL,
	[FREE] [nchar](10) NOT NULL,
	[PRICE] [numeric](20, 0) NOT NULL,
	[SIZE] [nvarchar](50) NOT NULL,
	[MIN_ANDROID] [nvarchar](255) NULL,
	[DEVELOPER_ID] [nvarchar](255) NOT NULL,
	[RELEASED] [datetime] NULL,
	[LAST_UPDATED] [datetime] NOT NULL,
	[CONTENT_RATING] [nvarchar](50) NOT NULL,
	[AD_SUPPORTED] [nchar](10) NOT NULL,
	[IN_APP_PURCHASES] [nchar](10) NOT NULL,
	[EDITOR_CHOICE] [nchar](10) NOT NULL
) ON [PRIMARY]

GO
