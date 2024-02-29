import SymbolLogoDark from '@/assets/logo/symbol-logo-with-dark-text.webp';
import SymbolLogoLight from '@/assets/logo/symbol-logo-with-light-text.webp';
import LocaleSwitcher, { ArticleIdByLanguage } from '@/components/atom/LocaleSwitcher';
import { NAVIGATIONS } from '@/types/navigations';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  IoChatbubblesSharp,
  IoChevronForwardOutline,
  IoDocumentTextSharp,
  IoHomeSharp,
  IoMenuOutline,
  IoNewspaperSharp,
} from 'react-icons/io5';

const SITELINKS = [
  { title: 'Top', link: NAVIGATIONS.HOME, Icon: IoHomeSharp },
  { title: 'News', link: NAVIGATIONS.NEWS, Icon: IoNewspaperSharp },
  { title: 'Community', link: NAVIGATIONS.COMMUNITY, Icon: IoChatbubblesSharp },
  { title: 'Docs', link: NAVIGATIONS.DOCS, Icon: IoDocumentTextSharp },
];

export default function Header(props: { articleIdByLanguage?: ArticleIdByLanguage[] }): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [router.locale]);

  return (
    <>
      <div
        style={{
          width: '100%',
          position: 'sticky',
          zIndex: theme.zIndex.appBar,
          top: '20px',
        }}
      >
        <AppBar
          position='absolute'
          style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: theme.palette.text.primary,
            borderRadius: '10px',
            width: '96%',
            left: '50%',
            transform: 'translateX(-50%)',
            WebkitTransform: 'translateX(-50%)',
            msTransform: 'translateX(-50%)',
          }}
        >
          <Toolbar>
            <>
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <ButtonBase aria-label='logo' LinkComponent={Link} href='/'>
                  <Image
                    src={SymbolLogoDark}
                    height={35}
                    width={155}
                    priority={false}
                    loading='lazy'
                    placeholder='blur'
                    alt='Symbol-Logo'
                  />
                </ButtonBase>
              </div>
              {matches || (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '20px',
                    marginRight: '40px',
                  }}
                >
                  {SITELINKS.map((item, index) => (
                    <Button
                      variant='text'
                      key={index}
                      LinkComponent={Link}
                      href={item.link}
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        minWidth: '6rem',
                      }}
                    >
                      {item.title}
                    </Button>
                  ))}
                  <LocaleSwitcher articleIdByLanguage={props.articleIdByLanguage} />
                </div>
              )}

              <IconButton
                size='large'
                edge='start'
                aria-label='menu'
                onClick={() => setOpen(!open)}
                style={{ color: 'black' }}
              >
                <IoMenuOutline />
              </IconButton>
            </>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor={'left'} open={open} onClose={() => setOpen(!open)}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            maxWidth: '300px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <ButtonBase aria-label='logo' LinkComponent={Link} href={'/'}>
              <Image
                src={SymbolLogoLight}
                height={35}
                width={155}
                priority={false}
                loading='lazy'
                placeholder='blur'
                alt='Symbol-Logo'
              />
            </ButtonBase>
          </div>
          <div>
            <Divider />
          </div>
          <List>
            {SITELINKS.map((item, index) => (
              <ListItemButton
                key={index}
                style={{ width: '70vh', maxWidth: '300px' }}
                component={Link}
                href={item.link}
                onClick={() => setOpen(!open)}
              >
                <item.Icon />
                <ListItemText primary={item.title} style={{ marginLeft: '1rem' }} />
                <IoChevronForwardOutline />
              </ListItemButton>
            ))}
            <ListItem>
              <LocaleSwitcher articleIdByLanguage={props.articleIdByLanguage} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
