const chatSection = document.querySelector('.flex.flex-col.gap-2.text-gray-100.text-sm');
const maxNumMessages = 100;
let numMessagesLoaded = 0;

const clickLoadMoreButton = () => {
    const showMoreButton = document.querySelector('.btn.flex.justify-center.gap-2.btn-dark.btn-small.m-auto.mb-2');
    if (showMoreButton) {
        showMoreButton.click();
        numMessagesLoaded += 20;
        setTimeout(() => {
            chatSection.scroll(0, chatSection.scrollHeight);
            clickLoadMoreButton();
        }, 1000);
    } else {
        numMessagesLoaded = 0;
    }
};

let isScrolling = false;
let scrollInterval;

const startScroll = () => {
    isScrolling = true;
    scrollInterval = setInterval(() => {
        chatSection.scrollBy(0, 50);
        const isChatSectionScrolledToBottom = chatSection.scrollTop + chatSection.clientHeight === chatSection.scrollHeight;
        if (isChatSectionScrolledToBottom && !isScrolling) {
            clearInterval(scrollInterval);
        }
    }, 10);
};

const stopScroll = () => {
    isScrolling = false;
};

chatSection.addEventListener('mouseover', startScroll);
chatSection.addEventListener('mouseout', stopScroll);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === chatSection && mutation.type === 'childList') {
            const isChatSectionScrolledToBottom = chatSection.scrollTop + chatSection.clientHeight === chatSection.scrollHeight;
            if (isChatSectionScrolledToBottom && numMessagesLoaded < maxNumMessages) {
                clickLoadMoreButton();
            }
        }
    });
});

observer.observe(chatSection, { childList: true });