/**
 * Created by Mateusz on 06.11.2016.
 * 157.158.170.90
 */

export var serverEndpoint = 'http://157.158.170.40:8080';
export var authEndpoint = `${serverEndpoint}/auth`;
export var ebookEndpoint = `${serverEndpoint}/ebook`;
export var imageEndpoint = `${serverEndpoint}/image`;
export var musicEndpoint = `${serverEndpoint}/music`;
export var videoEndpoint = `${serverEndpoint}/video`;

export var uploadEndpoint = `auth/upload`;

export var ebookUploadEndpoint = `${ebookEndpoint}/${uploadEndpoint}`;
export var imageUploadEndpoint = `${imageEndpoint}/${uploadEndpoint}`;
export var musicUploadEndpoint = `${musicEndpoint}/${uploadEndpoint}`;
export var videoUploadEndpoint = `${videoEndpoint}/${uploadEndpoint}`;

export var title = 'Streamer';
