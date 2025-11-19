import { useState, useCallback } from "react";
import { getLogList, postLog, putLog, deleteLog } from "../repositories/log";
import type { Log, NewLogInput } from "../entities/log";

export type RetUseLogs = ReturnType<typeof useLogs>;

export function useLogs() {
  // TODO: 実際の認証トークンを取得する実装が必要
  const accessToken = "";

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const refreshLogs = useCallback(async () => {
    try {
      const data = await getLogList(accessToken);
      console.log('getLogList response:', data);
      const logList = Array.from(data);
      console.log('logList after Array.from:', logList);
      setLogs(logList);
      return logList;
    } catch (err) {
      console.error('refreshLogs error:', err);
      setLogs([]);
      return [];
    }
  }, [accessToken]);

  const getLogs = useCallback(async () => {
    try {
      const data = await getLogList(accessToken);
      console.log('getLogs response:', data);
      const logList = Array.from(data);
      console.log('getLogs logList after Array.from:', logList);
      setLogs(logList);
      return logList;
    } catch (err) {
      console.error('getLogs error:', err);
      setLogs([]);
      return [];
    }
  }, [accessToken]);

  const addLog = useCallback(
    async (input: NewLogInput) => {
      setIsAdding(true);
      try {
        const data = await postLog(accessToken, input);
        await refreshLogs();
        setIsAdding(false);
        return "";
      } catch (err) {
        setIsAdding(false);
        return "ログの追加に失敗しました";
      }
    },
    [accessToken, refreshLogs]
  );

  const updateLog = useCallback(
    async (id: number, input: Partial<NewLogInput>) => {
      try {
        await putLog(accessToken, id, input);
        await refreshLogs();
        return "";
      } catch (err) {
        return "ログの更新に失敗しました";
      }
    },
    [accessToken, refreshLogs]
  );

  const removeLog = useCallback(
    async (id: number) => {
      setIsRemoving(true);
      try {
        await deleteLog(accessToken, id);
        await refreshLogs();
        setIsRemoving(false);
      } catch (err) {
        setIsRemoving(false);
      }
    },
    [accessToken, refreshLogs]
  );

  return {
    isLoading,
    isAdding,
    isRemoving,
    logs,
    getLogs,
    refreshLogs,
    addLog,
    updateLog,
    removeLog,
  };
}