import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActorCard from '../../components/ActorCard';
import { fetchActors } from '../../apis/actor';
import { useSearchPageContext } from './SearchPageContext';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ActorSearch = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const {
    actors,
    setActors,
    isActorLoading,
    setIsActorLoading,
    endOfActorResults,
    setEndOfActorResults,
    actorPage,
    setActorPage,
    totalActorPages,
    setTotalActorPages,
  } = useSearchPageContext();

  useEffect(() => {
    console.log('search term changed: ', searchTerm);
    setIsActorLoading(true);
    NProgress.start();
    fetchActors(searchTerm)
      .then((data) => {
        setActors(data?.results || []);
        setTotalActorPages(data?.total_pages || 0);
        setActorPage(data?.page || 1);
      })
      .finally(() => {
        setIsActorLoading(false);
        NProgress.done();
      });
  }, [searchTerm]);

  useEffect(() => {
    console.log('page changed: ', actorPage);
    if (actorPage >= totalActorPages) {
      console.log('end of results');
      setEndOfActorResults(true);
      return;
    } else {
      setEndOfActorResults(false);
    }

    setIsActorLoading(true);
    NProgress.start();
    fetchActors(searchTerm, actorPage)
      .then((data) => {
        const newActors = data?.results || [];
        setActors((prevActors) => [...prevActors, ...newActors]);
      })
      .finally(() => {
        setIsActorLoading(false);
        NProgress.done();
      });
  }, [actorPage]);

  useEffect(() => {
    let debounceTimeout;
    const handleScroll = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (
          scrollTop + windowHeight >= documentHeight - 100 &&
          !isActorLoading
        ) {
          setActorPage((prevPage) => prevPage + 1);
        }
      }, 200); // adjust the delay as needed
    };

    if (!isActorLoading) {
      document.addEventListener('scroll', handleScroll);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isActorLoading]);

  return (
    <div>
      <div style={containerStyles}>
        {actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
      {endOfActorResults ? (
        <p className=" text-center font-bold text-black py-4">THE END</p>
      ) : (
        <p className="text-center font-bold text-black py-4">LOADING</p>
      )}
    </div>
  );
};

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap', // Wrap items to the next row if needed
  paddingLeft: '1rem', // Left padding
  gap: '1rem',
  justifyContent: 'space-around',
  maxWidth: '1200px', // Optional: Limit the maximum width of the container
};

export default ActorSearch;
