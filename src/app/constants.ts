/**
 * Created by Mateusz on 06.11.2016.
 * 157.158.170.90
 */
import {environment} from '../environments/environment';


export let mainEndpoint: string = environment.serverEndpoint;
export let authEndpoint = `${mainEndpoint}/auth`;
export let ebookEndpoint = `${mainEndpoint}/ebook`;
export let imageEndpoint = `${mainEndpoint}/image`;
export let musicEndpoint = `${mainEndpoint}/music`;
export let videoEndpoint = `${mainEndpoint}/video`;

export let uploadEndpoint = `auth/upload`;

export let ebookUploadEndpoint = `${ebookEndpoint}/${uploadEndpoint}`;
export let imageUploadEndpoint = `${imageEndpoint}/${uploadEndpoint}`;
export let musicUploadEndpoint = `${musicEndpoint}/${uploadEndpoint}`;
export let videoUploadEndpoint = `${videoEndpoint}/${uploadEndpoint}`;

export let musicStreamEndpoint = `${musicEndpoint}/noauth/download`;
export let musicStreamAuthEndpoint = `${musicEndpoint}/auth/download`;

export let videoStreamEndpoint = `${videoEndpoint}/noauth/download`;
export let videoStreamAuthEndpoint = `${videoEndpoint}/auth/download`;

export let imageStreamEndpoint = `${imageEndpoint}/noauth/download`;
export let imageStreamAuthEndpoint = `${imageEndpoint}/auth/download`;

export let ebookStreamEndpoint = `${ebookEndpoint}/noauth/download`;
export let ebookStreamAuthEndpoint = `${ebookEndpoint}/auth/download`;

export let videoThumbnailEndpoint = `${videoEndpoint}/noauth/thumbnail`;

export let title = 'Streamer';
