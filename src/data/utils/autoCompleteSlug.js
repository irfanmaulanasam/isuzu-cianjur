export const autoCompleteSlug = (shortSlug) => {
    if (!shortSlug) return null;
    if (shortSlug === "blindvan") return "traga-blind-van";
    
    const prefixMap = {
        "nmr": "elf-", "nlr": "elf-", "nps": "elf-", "nqr": "elf-",
        "dmax": "", "traga": "", "blind-van": "traga-", "box": "traga-",
        "mu-x": "", "giga": "", "elf": ""
    };
    for (const [key, prefix] of Object.entries(prefixMap)) {
        if (shortSlug.startsWith(key) || shortSlug === key.replace('-', '')) {
            return prefix + shortSlug;
        }
    }
    return shortSlug;
};