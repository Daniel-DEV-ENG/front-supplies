import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['profile_photos_videos', 'profile_timeline', 'profile_about'];
const ProfileApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProfilePhotosVideos: build.query({
				query: () => ({ url: `/mock-api/profile/photos-videos` }),
				providesTags: ['profile_photos_videos']
			}),
			getProfileLocation: build.query({
				query: (id) => ({ url: `/locations/${id}` }),
				providesTags: ['profile_timeline']
			}),
			getProfileAbout: build.query({
				query: () => ({ url: `/mock-api/profile/about` }),
				providesTags: ['profile_about']
			})
		}),
		overrideExisting: false
	});
export default ProfileApi;
export const { useGetProfilePhotosVideosQuery, useGetProfileLocationQuery, useGetProfileAboutQuery } = ProfileApi;
