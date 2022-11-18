using System;
using System.Collections.Concurrent;

namespace Tianyu.Server.User.Services
{
    public class TimerServer
    {
        public static TimerServer Instance
        {
            get
            {
                if (instance is null)
                    instance = new TimerServer();
                return instance;
            }
        }

        private static TimerServer? instance;

        private readonly ConcurrentDictionary<string, Action> triggerMap;
        private readonly System.Timers.Timer timer;

        private TimerServer()
        {
            triggerMap = new ConcurrentDictionary<string, Action>();

            DateTime now = DateTime.Now;
            DateTime targetTime = new DateTime
                (
                now.Year,
                now.Month,
                now.Day + 1
                );
            timer = new System.Timers.Timer
            {
                AutoReset = false,
                Interval = (targetTime - now).TotalMilliseconds
            };
            timer.Elapsed += new System.Timers.ElapsedEventHandler(OnTimer);
            // timer.Start();
        }

        private void OnTimer(object? sender, System.Timers.ElapsedEventArgs e)
        {
            timer.Stop();

            // to do GC
            foreach (Action trigger in triggerMap.Values)
            {
                try
                {
                    ThreadPool.QueueUserWorkItem((object? state) =>
                    {
                        trigger();
                    });
                }
                catch
                {
                    //
                }
            }

            // reset timer to 24h
            DateTime now = DateTime.Now;
            DateTime targetTime = new DateTime
                (
                now.Year,
                now.Month,
                now.Day + 1
                );
            timer.Interval = (targetTime - now).TotalMilliseconds;
            timer.Start();
        }

        public bool Register(string id, Action callback) => triggerMap.TryAdd(id, callback);
        public bool Unregister(string id, out Action? callback) => triggerMap.TryRemove(id, out callback);
    }
}

