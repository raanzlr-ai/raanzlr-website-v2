<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/1999/xhtml"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Raanzlr</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
          }
          
          .header p {
            font-size: 1.1em;
            opacity: 0.95;
          }
          
          .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 30px;
            border-radius: 8px;
          }
          
          .info-box h2 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 1.3em;
          }
          
          .info-box p {
            color: #666;
            line-height: 1.8;
          }
          
          .stats {
            display: flex;
            justify-content: space-around;
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
          }
          
          .stat {
            text-align: center;
          }
          
          .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            display: block;
          }
          
          .stat-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .content {
            padding: 30px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          
          thead {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85em;
            letter-spacing: 0.5px;
          }
          
          td {
            padding: 15px;
            border-bottom: 1px solid #e0e0e0;
          }
          
          tbody tr {
            transition: background-color 0.2s;
          }
          
          tbody tr:hover {
            background-color: #f8f9fa;
          }
          
          .url-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          
          .url-link:hover {
            text-decoration: underline;
          }
          
          .priority {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
          }
          
          .priority-high {
            background: #d4edda;
            color: #155724;
          }
          
          .priority-medium {
            background: #fff3cd;
            color: #856404;
          }
          
          .priority-low {
            background: #f8d7da;
            color: #721c24;
          }
          
          .changefreq {
            color: #666;
            font-size: 0.9em;
            text-transform: capitalize;
          }
          
          .lastmod {
            color: #999;
            font-size: 0.85em;
          }
          
          .image-preview {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #e0e0e0;
          }
          
          .image-count {
            background: #667eea;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 600;
          }
          
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            color: #666;
            border-top: 1px solid #e0e0e0;
          }
          
          .footer a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .stats {
              flex-direction: column;
              gap: 20px;
            }
            
            table {
              font-size: 0.9em;
            }
            
            th, td {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🗺️ XML Sitemap</h1>
            <p>Raanzlr - AI Solutions &amp; Software Engineering</p>
          </div>
          
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <xsl:call-template name="sitemapindex"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:call-template name="urlset"/>
            </xsl:otherwise>
          </xsl:choose>
          
          <div class="footer">
            <p>Generated for <a href="https://raanzlr.com">Raanzlr.com</a></p>
            <p style="margin-top: 10px; font-size: 0.9em;">This sitemap helps search engines discover and index our content efficiently.</p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template name="sitemapindex">
    <div class="stats">
      <div class="stat">
        <span class="stat-number"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></span>
        <span class="stat-label">Sitemaps</span>
      </div>
    </div>
    
    <div class="info-box">
      <h2>📋 Sitemap Index</h2>
      <p>This is a sitemap index file that references multiple sitemap files. Search engines will crawl each of these sitemaps to discover all pages on the website.</p>
    </div>
    
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>Sitemap URL</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
            <tr>
              <td>
                <a href="{sitemap:loc}" class="url-link">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td class="lastmod">
                <xsl:value-of select="sitemap:lastmod"/>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>
  
  <xsl:template name="urlset">
    <div class="stats">
      <div class="stat">
        <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
        <span class="stat-label">URLs</span>
      </div>
      <div class="stat">
        <span class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url/image:image)"/></span>
        <span class="stat-label">Images</span>
      </div>
    </div>
    
    <div class="info-box">
      <h2>🔗 URL List</h2>
      <p>This sitemap contains URLs for pages and resources on our website. Each entry includes metadata like priority, change frequency, and last modification date to help search engines crawl efficiently.</p>
    </div>
    
    <div class="content">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Priority</th>
            <th>Change Frequency</th>
            <th>Last Modified</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td>
                <a href="{sitemap:loc}" class="url-link">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="sitemap:priority">
                    <xsl:variable name="priority" select="sitemap:priority"/>
                    <span>
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="$priority &gt;= 0.8">priority priority-high</xsl:when>
                          <xsl:when test="$priority &gt;= 0.5">priority priority-medium</xsl:when>
                          <xsl:otherwise>priority priority-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="$priority"/>
                    </span>
                  </xsl:when>
                  <xsl:otherwise>-</xsl:otherwise>
                </xsl:choose>
              </td>
              <td class="changefreq">
                <xsl:choose>
                  <xsl:when test="sitemap:changefreq">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </xsl:when>
                  <xsl:otherwise>-</xsl:otherwise>
                </xsl:choose>
              </td>
              <td class="lastmod">
                <xsl:value-of select="sitemap:lastmod"/>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="image:image">
                    <span class="image-count">
                      <xsl:value-of select="count(image:image)"/>
                    </span>
                  </xsl:when>
                  <xsl:otherwise>-</xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>
  
</xsl:stylesheet>
