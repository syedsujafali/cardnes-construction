import re

def process_file():
    with open('src/App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    def process_class(match):
        cls_str = match.group(1)
        classes = cls_str.split()
        
        has_small_text = False
        small_size_classes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl']
        for c in classes:
            if c in small_size_classes:
                has_small_text = True
            elif c.startswith('text-[') and (c.startswith('text-[0.') or c.startswith('text-[1.') or c.startswith('text-[2.')):
                has_small_text = True
                
        if has_small_text:
            classes = [c for c in classes if not c.startswith('font-') or c == 'font-display']
            if 'font-bold' not in classes:
                classes.append('font-bold')
            
        return 'className="' + ' '.join(classes) + '"'

    new_content = re.sub(r'className="([^"]+)"', process_class, content)

    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    process_file()
