import { DescriptorStore } from './DescriptorStore';
import { compile } from '@vuedx/preview-compiler';

export class PreviewCompilerStore {
  constructor(private descriptors: DescriptorStore) {}

  compile(fileName: string, index: number): string {
    const block = this.descriptors.get(fileName).customBlocks[index];
    if (block == null) return `throw new Error('No such preview: ${fileName} { index: ${index} }')`;

    return this.compileText(block.content, fileName, `${fileName}:${index}`);
  }

  compileText(content: string, fileName: string, id: string = fileName + ':auto'): string {
    return compile(content, {
      componentFileName: fileName,
      hmrId: id,
    });
  }
}
