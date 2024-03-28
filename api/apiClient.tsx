import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export interface Review {
    id: number
    userId: number
    songId: number
    date: string
    review: string
}

export interface Song {
    id: number
    title: string 
    artist: string
    album: string
    releaseYear: number
    genre: string
    durationSeconds: number 
}

export function convertToReview(reviewJson: any): Review {
    return {
        id: reviewJson.id,
        songId: reviewJson.songId,
        userId: reviewJson.userId,
        date: reviewJson.date,
        review: reviewJson.review
    };
}

export function convertToReviewArray(data: any): Review[] {
    for(let i = 0; i < data.length; i++) {
        data[i] = convertToReview(data[i]);
    }
    return data;
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

    public async postReview(review: Review): Promise<Review> {
        try {
            console.log("Posting review")
            const response = await axios.post<Review>(`${this.apiUrl}/reviews`, review);
            return convertToReview(response.data);
        } catch (error) {
            throw new Error('Error creating a new song');
        }
    }

    public async getReviews(): Promise<Review[]> {
        try {
            const response = await axios.get<Review>(`${this.apiUrl}/reviews`);
            return convertToReviewArray(response.data);
        } catch (error) {
            throw new Error('Error creating a new song');
        }
    }

    public async getReview(id: number): Promise<Review> {
        try {
            const response = await axios.get<Review>(`${this.apiUrl}/reviews/${id}`);
            return convertToReview(response.data);
        } catch (error) {
            throw new Error('Error creating a new song');
        }
    }

    public async getSearchResults(searchTerm: string): Promise<Song[]> {
        try {
            console.log("getSearchResults");
            const response = await axios.get<string[]>(`${this.apiUrl}/search`, {
                params: { query: searchTerm } 
            });

            return convertToSongArray(response.data);
        } catch (error) {
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
            console.log("Getting song with ID: ", id);
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

