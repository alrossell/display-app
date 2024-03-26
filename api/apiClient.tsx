import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export interface Song {
    id: number
    title: string 
    artist: string
    album: string
    releaseYear: number
    genre: string
    durationSeconds: number 
}

export function convertToSong(songJson: any): Song {
    return {
        id: songJson.id,
        title: songJson.title,
        artist: songJson.artist,
        album: songJson.album,
        releaseYear: songJson.releaseYear,
        genre: songJson.genre,
        durationSeconds: songJson.durationSeconds
    };
}

export function convertToSongArray(data: any): Song[] {
    for(let i = 0; i < data.length; i++) {
        data[i] = convertToSong(data[i]);
    }
    return data;
}

class APIClient {
    constructor(private apiUrl: string) {}

    public async getSearchResults(searchTerm: string): Promise<Song[]> {

        try {
            console.log("getSearchResults");
            const response = await axios.get<string[]>(`${this.apiUrl}/search`, {
                params: { query: searchTerm } 
            });

            return convertToSongArray(response.data);
        } catch (error: any) {
            console.error('Error while searching for songs', error);
            throw new Error('Error while searching for songs');
        }
    }

    public async deleteAllSongs(): Promise<void> {
        try {
            console.log("Deleting all songs");
            await axios.delete(`${this.apiUrl}/songs`, {withCredentials: true});
            console.log("Deleted all songs");
        } catch (error) {
            throw new Error('Error deleting all songs');
        }
    }

    public async getSongs(): Promise<Song[]> {
        try {
            console.log("Getting songs");
            const response = await axios.get<Song[]>(`${this.apiUrl}/songs`,
            {withCredentials: true});
            return convertToSongArray(response.data);
        } catch (error) {
            throw new Error('Error fetching songs');
        }
    }

    public async getSong(id: string): Promise<Song> {
        try {
            const response = await axios.get<Song>(`${this.apiUrl}/songs/${id}`);
            return convertToSong(response.data); 
        } catch (error) {
            throw new Error(`Error fetching song with ID ${id}`);
        }
    }

    public async createSong(song: Song): Promise<Song> {
        try {
            const response = await axios.post<Song>(`${this.apiUrl}/songs`, song);
            return convertToSong(response.data);
        } catch (error) {
            throw new Error('Error creating a new song');
        }
    }

    public async updateSong(id: string, song: Partial<Song>): Promise<Song> {
        try {
            const response = await axios.put<Song>(`${this.apiUrl}/songs/${id}`, song);
            return convertToSong(response.data);
        } catch (error) {
            throw new Error(`Error updating song with ID ${id}`);
        }
    }

    public async deleteSong(id: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/songs/${id}`);
        } catch (error) {
            throw new Error(`Error deleting song with ID ${id}`);
        }
    }
}

const client = new APIClient(API_URL);
export default client;

