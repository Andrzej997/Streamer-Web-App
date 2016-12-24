/**
 * Created by Mateusz on 06.11.2016.
 * 157.158.170.90
 */
import {environment} from "../environments/environment";


export var mainEndpoint: string = environment.serverEndpoint;
export var authEndpoint = `${mainEndpoint}/auth`;
export var ebookEndpoint = `${mainEndpoint}/ebook`;
export var imageEndpoint = `${mainEndpoint}/image`;
export var musicEndpoint = `${mainEndpoint}/music`;
export var videoEndpoint = `${mainEndpoint}/video`;

export var uploadEndpoint = `auth/upload`;

export var ebookUploadEndpoint = `${ebookEndpoint}/${uploadEndpoint}`;
export var imageUploadEndpoint = `${imageEndpoint}/${uploadEndpoint}`;
export var musicUploadEndpoint = `${musicEndpoint}/${uploadEndpoint}`;
export var videoUploadEndpoint = `${videoEndpoint}/${uploadEndpoint}`;

export var musicStreamEndpoint = `${musicEndpoint}/noauth/download`;
export var musicStreamAuthEndpoint = `${musicEndpoint}/auth/download`;

export var videoStreamEndpoint = `${videoEndpoint}/noauth/download`;
export var videoStreamAuthEndpoint = `${videoEndpoint}/auth/download`;

export var imageStreamEndpoint = `${imageEndpoint}/noauth/download`;
export var imageStreamAuthEndpoint = `${imageEndpoint}/auth/download`;

export var ebookStreamEndpoint = `${ebookEndpoint}/noauth/download`;
export var ebookStreamAuthEndpoint = `${ebookEndpoint}/auth/download`;

export var title = 'Streamer';
