import { useForm } from 'react-hook-form';
import '../styles/main-card.css';
import ToggleBar from './ToggleBar';
import { useEffect } from 'react';

const MainCard = ({ setView, view }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (formData) => {
    const formattedDate = new Date(formData.date)
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(',', '');

    const payload = {
      emailAddress: formData.email,
      course: formData.course,
      date: formattedDate,
      repeat: Number(formData.interval),
    };

    try {
      const res = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Server Error');
      }
    } catch {
      console.log('Submission Failed');
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div className="body-wrapper">
        <ToggleBar />
        <div className="form-wrapper">
          <div className="banner-create">
            <h3>Create</h3>
          </div>
          <div className="main-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="label-flex">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    validate: (value) => {
                      if (!value.includes('@')) {
                        return 'Email must include @';
                      }
                      return true;
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="errors">{errors.email.message}</div>
              )}

              <div className="label-flex">
                <label htmlFor="course">Course:</label>
                <input
                  type="text"
                  {...register('course', { required: true })}
                />
              </div>
              {/* <div className="label-flex">
                <label htmlFor="message">Message: </label>
                <input
                  type="text"
                  {...register('message', { required: true })}
                />
              </div> */}

              <h4>Schedule / Interval </h4>
              <div className="label-flex">
                <label htmlFor="date">Date To Send:</label>
                <input
                  type="datetime-local"
                  {...register('date', { required: true })}
                />
              </div>
              <div className="label-flex">
                <label htmlFor="interval">
                  Days Between Each Recurring Submission (0 for one time
                  reminder):
                </label>
                <input
                  type="number"
                  min={0}
                  {...register('interval', { required: true })}
                />
              </div>
              <button type="submit" className="form-button">
                Create
              </button>
            </form>
          </div>
        </div>
        <div className="delete-slot"></div>
      </div>
    </>
  );
};

export default MainCard;
