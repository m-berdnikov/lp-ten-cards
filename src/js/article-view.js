document.addEventListener('DOMContentLoaded', () => {

    let articleBlock = document.querySelector('.js-article-block');
    let footerAnchor = document.querySelector('.js-footer-anchor');
    let scrollToTop = document.querySelector('.js-scroll-to-top');
    let articleParagraph = document.querySelectorAll('.js-article-paragraph');
    let flag = true;
    // let id = 0;

    document.addEventListener('scroll', () => {
        let topFooter = footerAnchor.getBoundingClientRect().top;
        let browserHeight = document.documentElement.clientHeight;
        if (topFooter <= browserHeight && flag) {
            // console.log('докрутили');
            flag = false;
            showArticleBlock();
        }
    });

    scrollToTop.addEventListener('click', ()=>{
        document.querySelector('body').scrollIntoView({behavior: "smooth", block: "start"});
    });

    function showArticleBlock() {
        articleBlock.classList.add('open');

        let time = 0;
        articleParagraph.forEach(item => {
            setTimeout(() => {
                item.classList.add('open')
            }, time += 2000);
        })
    }
});