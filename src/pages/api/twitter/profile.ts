import Twitter from 'twitter-lite';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';
import { TwitterApi } from 'twitter-api-v2';
import axiosInstance from '../../../utils/axios';

export default async (req: any, res: any) => {
  console.log(1);
  const session = await getSession({ req });
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;
  const userId = session?.id;
  const username = session?.username;

  console.log(accessToken)
  console.log(refreshToken)
  const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY!,
    appSecret: process.env.TWITTER_CONSUMER_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  });

  console.log(userId);
    const followed = await client.v2.following(userId!, {
      max_results: 1000
    });
    const followersResponse = await axiosInstance.get(`${process.env.BACKEND_URL}analytics/twitterFollowersCount?account=${username!}`)
   /* const publicMetrics = await client.v2.user(userId!,{
      'user.fields':'public_metrics'
    });
    console.log(publicMetrics);*/
    let result = {
      followed: followed,
      followersCount: followersResponse.data.data
    }
    return res.status(200).json({
      result
    });

}