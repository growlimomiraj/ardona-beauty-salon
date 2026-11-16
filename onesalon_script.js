$(document).ready(function() {
	$(".toggle-nav").click(function(){
		$(this).toggleClass("active");
		$(".owerlay").toggleClass("active");
		$("header section.section-header .menu").toggleClass("active");
		$(".overflow").toggleClass("active");
	});
	$(".owerlay").click(function(){
		$(this).removeClass("active");
		$(".toggle-nav").removeClass("active");
		$("header section.section-header .menu").removeClass("active");
		$(".overflow").removeClass("active");
	});
});
$(document).ready(function(){
	$('.according').click(function(){
		// Если текущий заголовок уже активен
		if ($(this).hasClass('active')) {
			// Закрываем соответствующий блок accordion__content и удаляем класс 'active'
			$(this).removeClass('active');
			$(this).next('.accordion__content').slideUp();
		} else {
			// Закрываем все блоки accordion__content и удаляем класс 'active' у всех заголовков
			$('.accordion__content').slideUp();
			$('.according').removeClass('active');
	
			// Добавляем класс 'active' текущему заголовку и открываем следующий блок accordion__content
			$(this).addClass('active');
			$(this).next('.accordion__content').slideDown();
		}
	});
});
$(document).ready(function(){
	$('.accordion__title').click(function(){
		// Если текущий заголовок уже активен
		if ($(this).hasClass('active')) {
			// Закрываем соответствующий блок accordion__content и удаляем класс 'active'
			$(this).removeClass('active');
			$(this).next('.accordion__content_faq').slideUp();
		} else {
			// Закрываем все блоки accordion__content и удаляем класс 'active' у всех заголовков
			$('.accordion__content_faq').slideUp();
			$('.accordion__title').removeClass('active');
	
			// Добавляем класс 'active' текущему заголовку и открываем следующий блок accordion__content
			$(this).addClass('active');
			$(this).next('.accordion__content_faq').slideDown();
		}
	});
});
document.getElementById('teamSelect').addEventListener('change', function() {
    var selectedValue = this.value;
    
    var fullTeamDiv = document.getElementById('fullTeam');
    var withArsenDiv = document.getElementById('withArsen');
    
    if (selectedValue === 'full') {
        fullTeamDiv.style.display = 'flex';
        withArsenDiv.style.display = 'none';
    } else if (selectedValue === 'arsen') {
        fullTeamDiv.style.display = 'none';
        withArsenDiv.style.display = 'flex';
    }
});