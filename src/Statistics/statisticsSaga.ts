import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  Statistics,
} from "./statisticsSlice";
import { BackendUrl } from "../config/api";

// Type for Axios response
type StatisticsApiResponse = AxiosResponse<Statistics>;

// Function to fetch statistics from the backend
async function fetchStatisticsApi(): Promise<Statistics> {
  const response: StatisticsApiResponse = await axios.get<Statistics>(
    `${BackendUrl}/statistics`
  );
  return response.data;
}

// Saga to handle the side effect of fetching statistics
function* fetchStatisticsSaga(): Generator {
  try {
    // Use `call` effect for async operation, typed as `Promise<Statistics>`
    const statistics: Statistics = (yield call(
      fetchStatisticsApi
    )) as Statistics;
    // Dispatch success action with statistics data
    yield put(fetchStatisticsSuccess(statistics));
  } catch (error: any) {
    // Dispatch failure action with error message
    yield put(fetchStatisticsFailure(error.message));
  }
}

// Watcher saga to listen for fetchStatisticsRequest action
export function* watchFetchStatisticsSaga(): Generator {
  yield takeLatest(fetchStatisticsRequest.type, fetchStatisticsSaga);
}
