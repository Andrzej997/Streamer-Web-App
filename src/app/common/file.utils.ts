import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';

export class FileUtils {

  static getFileName(file: FileItem): string {
    if (file == null || file.file == null) {
      return null;
    }
    return FileUtils.removeExtension(file.file.name);
  }

  static getFileNameF(file: File): string {
    if (file == null) {
      return null;
    }
    return FileUtils.removeExtension(file.name);
  }

  static removeExtension(name: string): string {
    return name.substr(0, name.lastIndexOf('.'));
  }

  static getExtension(file: FileItem): string {
    if (file == null || file.file == null) {
      return null;
    }
    let name = file.file.name;
    return name.substr(name.lastIndexOf('.') + 1, name.length - 1);
  }

  static getExtensionF(file: File): string {
    if (file == null) {
      return null;
    }
    let name = file.name;
    return name.substr(name.lastIndexOf('.') + 1, name.length - 1);
  }

  static getFileSize(file: FileItem): number {
    if (file == null || file.file == null) {
      return NaN;
    }
    return file.file.size;
  }

  static getFileSizeF(file: File): number {
    return file != null ? file.size : null;
  }

  static getFileCreationDate(file: FileItem): Date {
    if (file == null || file.file == null) {
      return null;
    }
    return file.file.lastModifiedDate;
  }

  static getFileCreationDateF(file: File): Date {
    return file != null ? file.lastModifiedDate : null;
  }

  static getFileType(file: FileItem): string {
    if (file == null || file.file == null) {
      return null;
    }
    return file.file.type;
  }

  static getFileTypeF(file: File): string {
    return file != null ? file.type : null;
  }

}
