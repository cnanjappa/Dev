## modern-cewp

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO


<div class="BlogArchive">
    <div class="blog-filter">
        Year: &nbsp;
        <select id="selYear">
        	<option value="All">All</option>
        </select>
    </div>
    <div class="filter-submit" onclick="buttonClick();">
        <input type="button" value="Filter">
    </div><br/>
    <div class="blog-list">
        <div class="blog-container">
            <div class="blog-body"></div>
        </div>
    </div>
</div>

<script type="text/javascript">

    $(document).ready(function () {
        var myselect = document.getElementById("selYear");
        var startYear = new Date().getFullYear();
        for(count=3;count>0;count--, startYear --)
        {
            myselect.add(new Option(startYear, startYear), null);
        }
        getArchive();
    });

    function buttonClick() {       
        getArchive();        
    }

    function getArchive() {
        $(".blog-body").empty();
        var category = "BoardChair";
        var year = $('#selYear').val();        
        var endDate = new Date().getFullYear();
        var beginDate = endDate -2;
    	if (year == "All")
    	{
    		beginDate = beginDate + "-01-01T00%3a00%3a00";
	        endDate = endDate + "-12-31T23%3a59%3a59"; 
		}
    	else
    	{
    		beginDate = year + "-01-01T00%3a00%3a00";
	        endDate = year + "-12-31T23%3a59%3a59";     		
	    }
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/execblog/_api/web/lists/getByTitle('Executive%20Blogs')/items?$select=Authors,BlogAuthor/Name,BlogAuthor/Title,Title,Id,ArticleStartDate,Category,OData__ModerationStatus&$expand=BlogAuthor/Id&$orderby=ArticleStartDate desc&$filter=(Category eq '" + category + "')and(OData__ModerationStatus eq 0) and(ArticleStartDate ge datetime'" + beginDate + "') and (ArticleStartDate le datetime'" + endDate + "')",
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function (data) {
            	if (data.d.results.length > 0)
            	{
	                var month = "";
	                var output = "";
	                $.each(data.d.results,function(count,item){	       
	                    var startDate = new Date( item.ArticleStartDate); 
	                    var author = "";
	                    if (item.BlogAuthor.Title!=undefined){
	                    	author = item.BlogAuthor.Title;
	                    }else{
	                    	author = item.Authors;
	                    }
	                    if (author == "Support Board") author = "Board Member";
	                    var currentMonth = startDate.toLocaleString('en-US', { month: 'long' });                  
	                    if (month != currentMonth )
	                    {
	                        month = currentMonth ;  
	                        output += "<div class='blog-item-header'>" + month + ', ' + startDate.getFullYear() + "</div>";                        
	                    }
	                    output += "<div class='blog-item'><div class='blog-date-time'>" + month + ' ' + + startDate.getDate() + ', ' + startDate.getFullYear() + "</div><div class='blog-author'>" + author + "</div> <a href='/sites/fmhomesite/ExecutiveBlog/Lists/Community%20Discussion/Flat.aspx?RootFolder=%2Fsites%2Ffmhomesite%2FExecutiveBlog%2FLists%2FCommunity%20Discussion%2F" + item.Title + "&BlogId=" + item.ID + "'><b>" + item.Title + "</b></a></div>";                                      
	                })
                }
                else
                {
                	output = "There are no items to show in this view.";
                }
                $(".blog-body").append(output);                 
            },
            error: function (error) {
                $(".blog-body").append(JSON.stringify(error));
            }
        });
    }
    
</script>
