<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<!--<!DOCTYPE html>-->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <!--<link rel="icon" href="../../favicon.ico" />-->

    <title>
      <xsl:value-of select="book/title" />
    </title>

    <!-- Custom styles for this template -->
    <link href="../../../css/books.css" rel="stylesheet" />
    <link href="../../../css/bubbles.css" rel="stylesheet" />
    <link href="../../../css/animate.css" rel="stylesheet" type="text/css" />
    <script src="../../../js/jquery.min.js"></script>
    <script src="../../../js/waypoints.min.js"></script>
    <script type="text/javascript">
    jQuery(function($) { 
        $('.cover').waypoint(function() {
            $(this).toggleClass( 'bounceIn animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });
        $('.page').waypoint(function() {
            $(this).toggleClass( 'bounceIn animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });
        
        $('.coverTitle').waypoint(function() {
            $(this).toggleClass( 'fadeInRight animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });
        
        $('h2').waypoint(function() {
            $(this).toggleClass( 'fadeInRight animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });

        $('li').waypoint(function() {
            $(this).toggleClass( 'fadeInRight animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });
  
    });
    </script>

  </head>

<body>
<a name="top" id="top" />
<section id="content">
    <div class="container">
        <h1 class="rubberBand">LuzEnTuVida.net</h1>
        
        <div class="cover">
            <br/>
            <p class="coverTitle">
                <xsl:value-of select="book/cover" />
            </p>
        </div>
<br/>
        <a name="index" id="index" />
        <h2>
           <xsl:value-of select="book/index/@title" />
        </h2>
        <ul>
          <xsl:for-each select="book/index/item">
               <li><a href="#p{@link}">Página <xsl:value-of select="@link" />: <xsl:value-of select="@title" /></a></li>
          </xsl:for-each>
        </ul>

<br/>
        <xsl:for-each select="book/content/page">
            <br/>
            <br/>
            <a id="p{@id}" name="p{@id}">Página <xsl:value-of select="@id" />: <xsl:value-of select="@title" /> </a>
            <div class="page" id="{concat(/book/@id, '_', @id)}">
                 <xsl:for-each select="bubble">
                      <p class="{concat('bubbles', ' ', @class)}">
                        <!--<xsl:value-of select="." />-->
                        <xsl:apply-templates />
                      </p>
                      <br/>
                 </xsl:for-each>
            </div>
        </xsl:for-each>

        
        <xsl:apply-templates select="book/footer"/>
        

    </div>
</section>
</body>
</html>
</xsl:template>

<xsl:template match="content">
  <xsl:apply-templates select="p"/>
  <xsl:apply-templates select="ul"/>
  <xsl:apply-templates select="ol"/>

</xsl:template>

<xsl:template match="p">
  <p>
  <xsl:apply-templates />
  </p>
</xsl:template>

<xsl:template match="big">
  <big>
  <xsl:apply-templates />
  </big>
</xsl:template>

<xsl:template match="a">
  <a>
      <xsl:attribute name="href">
          <xsl:value-of select="@href" />
      </xsl:attribute>
      <xsl:value-of select="." />
  </a>
</xsl:template>


</xsl:stylesheet>