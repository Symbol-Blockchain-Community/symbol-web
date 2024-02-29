import IconDiscord from '@/assets/logo/discord.svg';
import IconGithub from '@/assets/logo/github.svg';
import IconNews from '@/assets/logo/news.svg';
import IconSlack from '@/assets/logo/slack.svg';
import IconTwitter from '@/assets/logo/twitter.svg';
import { SpaceField } from '@/types/StrapiModel';
import removeMarkdown from 'markdown-to-text';
import { StaticImageData } from 'next/image';

/** Return illustrations to be displayed by platform out of the list displayed in the community list. */
export function switchCommunityPlatformToLogo(platform: SpaceField['platform']): StaticImageData {
  switch (platform) {
    case 'discord':
      return IconDiscord;
    case 'github':
      return IconGithub;
    case 'slack':
      return IconSlack;
    case 'twitter':
      return IconTwitter;
    case 'web':
      return IconNews;
    default:
      return IconNews;
  }
}

export function removeMarkdownTagFromText(text?: string): string {
  return removeMarkdown(text?.replace(/\r\n|\r|\n/g, '').replace(/!\[.*?\]\(.*?\)/g, '') ?? '');
}
