$.fn.Slider= function (options)
{

     var opt = $.extend({}, {
		listName: 'PromotedLinks',
		viewTitle: 'All Promoted Links',
		prev: "<",
		next: ">",
		autoplay: true,
		infinite: true,
		animation: 'horizontal',
		arrows: true,
		dots: true,
		keys: true,
		delay: 5000,
		url: null					
    }, options);

		var url = opt.url + "/_api/web/lists/getByTitle('" + opt.listName + "')/Views/getbytitle('" + opt.viewTitle + "')";
		var call = $.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				Accept: "application/json;odata=verbose"
			}
		});
		call.done(function (data,textStatus, jqXHR){
			var viewQuery = data.d.ViewQuery;
			var viewXml = '<View><Query>' + viewQuery + '</Query></View>';
			var url = opt.url + "/_api/web/lists/getbytitle('" + opt.listName + "')/getitems"; 
			var query = {  
				'query' : {
					'__metadata': { 'type': 'SP.CamlQuery' }, 
					'ViewXml' : viewXml  
				}
			};

			var getDigestCall = $.ajax({
				url: opt.url + '/_api/contextinfo',
				method: "POST",
				headers: { "Accept": "application/json; odata=verbose" }
			})

			getDigestCall.done(function (data,textStatus, jqXHR){
			
				var call2 = $.ajax({
					url: url,
					type: "POST",
					dataType: "json",
					data:  JSON.stringify(query),
					headers: {
						Accept: "application/json;odata=verbose",
						"Content-Type": "application/json;odata=verbose",
						"X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue
					}
		
				});
				call2.done(function (data,textStatus, jqXHR){
					for(index in data.d.results)
					{
							$("#PAITSlides").append("<li onclick='window.location=\"" + data.d.results[index].LinkLocation.Url + 
							"\"' ><div style=\"background-image: url('"+data.d.results[index].BackgroundImageLocation.Url +
							"');\" class='PAITSlide'>"+data.d.results[index].Description+"</div></li>");
					}		
					$('.PAITSlider').unslider({
						autoplay: opt.autoplay,
						infinite: opt.infinite,
						animation: opt.animation,
						arrows:	opt.arrows,
						dots: opt.dots,
						keys: opt.keys,
						delay: opt.delay
					})	
					
					$("a.prev").html(opt.prev);
					$("a.next").html(opt.next);

				});
			
				call2.fail(function (jqXHR,textStatus,errorThrown){
					alert("Error retrieving Fields: " + jqXHR.responseText);
				});


			});

			getDigestCall.fail(function (jqXHR,textStatus,errorThrown){
				alert("Error retrieving digest: " + jqXHR.responseText);
			});	
			
		});

		call.fail(function (jqXHR,textStatus,errorThrown){
			alert("Error retrieving view: " + jqXHR.responseText);
		});		
}
