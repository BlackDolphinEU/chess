
<HTML>
<HEAD>
<TITLE>Historical Ratings</TITLE>
<BODY  BGCOLOR="FFFFFF" TOPMARGIN=0 LEFTMARGIN=0 BOTTOMMARGIN=0 RIGHTMARGIN=0 vLink=#0066ff aLink=#cc9900 link=#0066ff>
<TABLE WIDTH="100%" BGCOLOR="FFFFFF" CELLPADDING="0" CELLSPACING="0" BACKGROUND="GIF/tabs_topborder.gif">
 <TR>
  <TD WIDTH="100%" ALIGN="LEFT">
   <IMG BORDER="0" SRC="GIF/CMLogo.gif">
   <IMG BORDER="0" SRC="GIF/tabs_about_sel.gif">
   <A HREF="Summary.asp?Params="><IMG BORDER="0" SRC="GIF/tabs_summary_notsel.gif"></A>
   <A HREF="PeakList.asp?Params="><IMG BORDER="0" SRC="GIF/tabs_players_notsel.gif"></A>
   <A HREF="MonthlyLists.asp?Params="><IMG BORDER="0" SRC="GIF/tabs_monthlylists_notsel.gif"></A>
   <A HREF="AgeLists.asp?Params="><IMG BORDER="0" SRC="GIF/tabs_agelists_notsel.gif"></A>
  </TD>
 </TR>
</TABLE>
<TABLE WIDTH="100%" BGCOLOR="FFFFFF">
 <TR>
  <TD WIDTH="100%" ALIGN="LEFT">
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<B><A HREF="Introduction.asp?Params=">Home</A></B></FONT>
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;<B><A HREF="HowToUse.asp?Params=">Using this site</A></B></FONT>
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;<B><A HREF="HistoricalRatings.asp?Params=">Historical ratings</A></B></FONT>
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;<B><A HREF="Formulas.asp?Params=">Formulas</A></B></FONT>
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;<B><A HREF="SourceData.asp?Params=">Source data</A></B></FONT>
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;<B><A HREF="FutureProjects.asp?Params=">Future projects</A></B></FONT>
   <FONT face=verdana size=2>&nbsp;&nbsp;&nbsp;<B><A HREF="Contact.asp?Params=">Contact</A></B></FONT>
  </TD>
 </TR>
</TABLE>
<TABLE WIDTH="100%" BORDER="0" CELLPADDING="4" CELLSPACING="4">
<TR><TD><FONT FACE="verdana" SIZE="4">&nbsp;&nbsp;&nbsp;Historical Ratings&nbsp;&nbsp;&nbsp;</FONT></TD></TR>
<TR><TD><FONT FACE="verdana" SIZE="2">A <B>"chess rating"</B> is a single number which describes the relative strength of one particular chess player, based upon the historical results (i.e., win, lose, or draw) of that player's serious games against other players.  Some people would say that a chess rating is supposed to measure the estimated strength of a player; others would say that a rating is merely a measure of recent success, and makes no attempt at being a statistical "estimate" or "predictor" of anything.  I prefer the first approach, because it allows me a scientific way to make choices about how the formula itself should work.  By assuming that the "superior" rating formula, out of two possible formulas, is the one which allows you to make more successful predictions about players' results in their next tournament or match, we can run prospective rating formulas against all of the historical data we have, and determine which formula "would have worked best" if it had been used at the time.</FONT></TD></TR>
<TR><TD><FONT FACE="verdana" SIZE="2">International chess ratings have been in existence for many years.  Professor Arpad Elo invented a rating system known as the Elo system, which was adopted by the international chess organization FIDE almost forty years ago.  Today the FIDE ratings are calculated four times a year and are often used for determining which players are invited to important tournaments such as world championships.  However, despite the incredible amount of information we do possess about the various chess events that occurred long ago, there are no "official" ratings prior to about 1970.  Professor Elo did include a single chart in his 1978 book which showed the career rating paths for about 35 historical greats, but that chart stopped around 1970, and it was based upon five-year blocks of data and thus did not contain much detail.  It was nevertheless an inspring graph and led me ultimately to my own attempts to improve on that graph.  Elo also included a single "historical rating" for hundreds of historical players, which I believe referred to their best five-year peak average.</FONT></TD></TR>
<TR><TD><FONT FACE="verdana" SIZE="2">I believe that historical chess ratings form a very important piece of the historical puzzle.  We can see which players won individual games, or individual tournaments, but it's really difficult to objectively compare the results of two different players unless they faced the same common opponents, or played each other.  Someday we might be able to use computer programs to make really accurate estimates about the strength of play, looking at each individual move, but for now the only practical options are to have a chess expert carefully assess the quality of each individual game played, or to calculate objective historical ratings based upon the simple outcome (win, lose, or draw) of each game, using a good formula and clean data.  Both approaches have their merits, but the historical rating approach is certainly more objective, more exhaustive, and quicker to finish.</FONT></TD></TR>
<TR><TD><FONT FACE="verdana" SIZE="2">Under the Elo system, players have an ongoing rating, and they are awarded extra rating points, or penalized rating points, depending on how their overall results compare to the expectations established by their rating and their opponent's rating.  The current FIDE approach is well-known to be a fairly slow and conservative rating system, where obvious changes in a player's skill (as with a rapidly improving young player, or a suddenly declining older player) are reflected much more quickly in other rating systems, such as the Professional Ratings or the Chessmetrics ratings.  The Elo ratings would change even more slowly in a scenario where players do not play very frequently, and that was a real problem when contemplating how to calculate the historical ratings, because that is absolutely the case for a lot of the older historical data.  Even Elo himself didn't use the Elo system when he was calculating his historical ratings; he used a simultaneous performance rating calculation (see the <A HREF="Formulas.asp?Params=">Formulas</A> section for more details on what that means) applied to individual five-year periods. </FONT></TD></TR>
<TR><TD><FONT FACE="verdana" SIZE="2">It was thus quite a challenge to determine a new rating formula to use in a historical context, and I go into much more detail about that in the <A HREF="Formulas.asp?Params=">Formulas</A> section.  But there was also an important question regarding how frequently to calculate the ratings.  In the past I have done it yearly for the pre-1950 ratings, but that is just not frequently enough to get a good understanding about the strength of individual players, or their progress from month to month.  Fortunately, as I have improved the quality of my underlying historical game data (the basis for the ratings), it became increasingly possible to calculate the ratings on a monthly basis.  For many events I only know the year but not the month, and so for those events I break up the results into 12 equal parts, and assume that 1/12th of the results happened during each month.  I don't like doing this, but I think it's better than assuming that the event happened in January, which is what I did last time around.  Ideally I would actually know the month and even the day for each event and possibly each game, and that is why I am so hopeful that all of you can help me by sending me corrections to my data.  I am pretty-well satisfied with my math at this point, but the data still needs to be improved.  To understand more about the issues with the underlying source data, you can read the <A HREF="SourceData.asp?Params=">Source data</A> section, but for now we will move on to a discussion of the formula itself:</FONT></TD></TR>
<TR><TD><FONT FACE="verdana" SIZE="2"><A HREF="Formulas.asp?Params=">Read about the rating formulas</A></FONT></TD></TR>
</TABLE>
</TABLE>

</BODY>
</HTML>



