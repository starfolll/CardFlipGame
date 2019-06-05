class TextPrinter {
    static PrintWidthDelay(node, text, delay, outerHtml = "") {
        node.innerHTML = "";
        for (let i = 0; i < text.length + 1; i++) {
            if (i !== text.length) {
                setTimeout(() => node.innerHTML += text[i], i * delay);
            } else {
                setTimeout(() => node.innerHTML += outerHtml, i * delay);
            }
        }
    }

    static RemoveCharactersWidthDelay(node, delay){
        for (let i = 0; i < node.innerText.length; i++) {
            setTimeout(() =>{
                node.innerText = node.innerText.substr(0, node.innerText.length - 1)
            }, i * delay)
        } 
    }
}