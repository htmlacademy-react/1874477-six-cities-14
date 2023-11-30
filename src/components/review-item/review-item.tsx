import { memo } from 'react';
import { Review } from '../../types-ts/review';

type ReviewProps = {
  review: Review;
};
function ReviewItemComponent({ review }: ReviewProps): JSX.Element {
  const reviewDate = new Date(review.date);
  const formattedDate = reviewDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{ width: `${Math.round(review.rating) * 20}%` }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={formattedDate}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

export const ReviewItem = memo(ReviewItemComponent);