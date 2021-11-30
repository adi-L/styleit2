export default function getCleanText(text:String):String {
    return text.replace(/\s/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '');
  }